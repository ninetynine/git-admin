const github = require('../../../helpers/github');
const { write } = require('../../../helpers/cli');

exports.command = 'remove <user> <repo>';
exports.describe = 'Remove a user from a repository';

exports.handler = ({ user, repo }) => {
    github.testRepo(repo, true);

    github.repo.user
        .remove({ user, repo })
        .then(() => write(`Removed ${user} from ${repo}`))
        .catch(() => write(`Unable to remove ${user} from ${repo}`))
}