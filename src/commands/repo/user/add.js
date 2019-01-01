const github = require('../../../helpers/github');

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
        .then(() => console.warn(`${user} added to ${repo}`))
        .catch(() => console.warn(`Unable to add ${user} to ${repo}`))
}