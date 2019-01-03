const github = require('../../../helpers/github');
const { page, maxPage, write } = require('../../../helpers/cli');

exports.command = 'list <repo>';
exports.describe = 'List users for a repository';

exports.builder = {
    page
}

exports.handler = ({ repo, page }) => {
    github.testRepo(repo, true);

    github.repo.user
        .list({ repo, page })
        .then(({ data, pagination }) => {
            const max_page = maxPage({ page, pagination });
            const pages = () => write(`Page ${page} ${max_page}`);

            pages();
            write('');

            if (!data.length) {
                write(`No users found ${repo}`);
            } else {
                data.forEach(user => write(user.login));
            }

            write('');
            pages();
        })
        .catch(() => write(`Unable to list users for ${repo}`))
}