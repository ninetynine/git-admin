const date = require('dayjs');

const github = require('../../../helpers/github');
const { maxPage, write } = require('../../../helpers/cli');
const { array } = require('../../../helpers/util');

const remove = require('./remove');

exports.command = 'inactive <repo>';
exports.describe = 'List all inactive users on a repository';

exports.builder = {
    sha: {
        alias: ['branch', 'b'],
        type: 'string'
    },
	until: {
		alias: ['before', 'u'],
		type: 'string',
		default:
			date()
				.subtract(1, 'month')
				.toISOString()
	},
	prune: {
		alias: ['p'],
		type: 'boolean',
		default: false
	}
}

exports.handler = ({ repo, sha, until, prune }) => {
    github.testRepo(repo, true);

    let users_page = 1,
        commits_page = 1;

    let users = [],
        active_users = [];

    until = date(until);

    const getUsers = async ({ data, pagination }) => {
        if (pagination && pagination.last) {
            write(`Getting contributors, scanning page ${++users_page} of ${pagination.last.page}`);

            const output = await github.repo.user.list({ repo, page: users_page });
            output.data.forEach(user => users.push(user.login));

            return getUsers(output);
        }

        data.forEach(user => users.push(user.login));
        users = array.unique(users);

        return users;
    }

    const warmup = async () => {
        const data = await github.repo.user.list({ repo, page: users_page });

        const max_page = maxPage({ page: 1, pagination: data.pagination });
        write(`Getting users, scanning page 1 ${max_page}`);

        await getUsers(data);
    }

    const getActiveUsers = async ({ data, pagination }) => {
        const last_commit = data[data.length - 1];

        if (!last_commit) {
            return active_users;
        }

        const last_date = date(last_commit.commit.author.date);

        if (last_date.isAfter(until)) {
            if (pagination && pagination.last) {
                write(`Getting commits, scanning page ${++commits_page} of ${pagination.last.page}`);

                const output = await github.repo.commits.list({ repo, sha, until, page: commits_page });
                output.data.forEach(commit => active_users.push(commit.author.login));

                return getActiveUsers(output);
            }
        }

        data.forEach(commit => active_users.push(commit.author.login));
        active_users = array.unique(active_users);

        return active_users;
    }

    github.repo.commits
        .list({ repo, sha, until })
        .then(async data => {
            await warmup();
            
            const max_page = maxPage({ page: 1, pagination: data.pagination });
            write(`Getting commits, scanning page 1 ${max_page}`);

            await getActiveUsers(data);

            const inactive_users = array.diff(users, active_users);

            if (!inactive_users) {
            	return write(`No inactive users found for ${repo} from ${until.format('MM-DD-YYYY')}`);
            }
            
            write();

            if (!prune) {
            	return write(...inactive_users);;
            }

        	inactive_users.forEach(user => (
        		remove.handler({ user, repo })
    		))
        })
        .catch(() => write(`Unable to find inactive users for ${repo}`));
}