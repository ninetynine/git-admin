const github = require('../../helpers/github');
const { maxPage, write, writeSwitch } = require('../../helpers/cli');

exports.command = 'create <repo> <new_branch>';
exports.describe = 'Create a branch for a repository';

exports.builder = {
    base_branch: {
        alias: ['base-branch', 'b'],
        type: 'string'
    }
}

exports.handler = ({ repo, new_branch, base_branch }) => {
    github.testRepo(repo, true);

    github.branch
        .create({ repo, new_branch, base_branch })
        .then(() => write('Branch created'))
        .catch(() => write(`Unable to create ${new_branch} on ${repo}`))
}