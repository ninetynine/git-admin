const github = require('../../../helpers/github');

exports.command = 'invite <user> <repo>';
exports.describe = 'Invite a user to a repository';

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
        .invite({ user, repo, permissions })
        .then(() => console.warn(`${user} invited to ${repo}`))
        .catch(() => console.warn(`Unable to invite ${user} to ${repo}`))
}