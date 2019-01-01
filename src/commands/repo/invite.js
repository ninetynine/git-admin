const github = require('../../helpers/github');

exports.command = 'invite <user> <repo>';
exports.describe = 'Invite a user to a repository';

exports.builder = {
    admin: {
        default: false
    }
}

exports.handler = ({ user, repo, admin }) => {
    github.testRepo(repo);

    github.repo
        .invite({ user, repo, admin })
        .then(() => console.warn(`${user} invited to ${repo}`))
        .catch(() => console.warn(`Unable to invite ${user} to ${repo}`))
}