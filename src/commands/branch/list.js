const github = require('../../helpers/github');
const { page, maxPage, write, writeSwitch } = require('../../helpers/cli');

exports.command = 'list <repo>';
exports.describe = 'List branches for a repository';

exports.builder = {
    page
}

exports.handler = ({ repo, page }) => {
    github.testRepo(repo, true);

    github.branch
        .list({ repo, page })
        .then(({ data, pagination }) => {
            const max_page = maxPage({ page, pagination });
            const pages = () => write(`Page ${page} ${max_page}`);

            pages();
            write();

            writeSwitch(
                !data.length,
                `No branches found ${repo}`,
                data.map(branch => `- ${branch.name}`)
            );

            write();
            pages();
        })
        .catch(() => write(`Unable to list branches for ${repo}`))
}