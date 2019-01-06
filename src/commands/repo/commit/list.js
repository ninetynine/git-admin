const github = require('../../../helpers/github');
const { page, maxPage, write, writeSwitch } = require('../../../helpers/cli');

exports.command = 'list <repo>';
exports.describe = 'List commits for a repository';

exports.builder = {
    page,
    sha: {
        alias: ['branch', 'b'],
        type: 'string'
    },
    path: {
        type: 'string'
    },
    author: {
        alias: ['user', 'u'],
        type: 'string'
    },
	since: {
		alias: ['after', 's'],
		type: 'string'
	},
	until: {
		alias: ['before', 'u'],
		type: 'string'
	},
}

exports.handler = ({ repo, page, ...argv }) => {
    github.testRepo(repo, true);

    github.repo.commits
        .list({ repo, page, ...argv })
        .then(({ data, pagination }) => {
            const max_page = maxPage({ page, pagination });
            const pages = () => write(`Page ${page} ${max_page}`);

            pages();
            write();

            writeSwitch(
                !data.length,
                `No commits found for ${repo}`,
                data.map(({ commit, committer, sha }) => (
                    [
                        `- ${commit.message.split('\n')[0]}`,
                        `  ${sha}`,
                        `  ${committer.login}`,
                        '\n\r'
                    ]
                ))
            );

            write();
            pages();
        })
        .catch(() => write(`Unable to list commits for ${repo}`))
}