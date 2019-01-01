const github = require('../../../helpers/github');

exports.command = 'remove <user> <repo>';
exports.describe = 'Remove a user from a repository';

exports.handler = ({ user, repo }) => {
    github.testRepo(repo, true);

    github.repo.user
        .remove({ user, repo })
        .then(() => console.warn(`Removed ${user} from ${repo}`))
        .catch(() => console.warn(`Unable to remove ${user} from ${repo}`))
}