const github = require('../../../helpers/github');
const { write } = require('../../../helpers/cli');

exports.command = 'add <user> <repo>';
exports.describe = 'Add a user to a repository';

exports.builder = {
    permissions: {
        alias: ['perms', 'perm', 'p'],
        choices: ['pull', 'push', 'admin'],
        type: 'string',
        default: 'push'
    }
}

exports.handler = ({ user, repo, permissions }) => {
    github.testRepo(repo, true);

    github.repo.user
        .add({ user, repo, permissions })
        .then(() => write(`${user} added to ${repo}`))
        .catch(() => write(`Unable to add ${user} to ${repo}`))
}