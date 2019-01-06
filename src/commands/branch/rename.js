const confirm = require('prompt-confirm');

const github = require('../../helpers/github');
const { force, write } = require('../../helpers/cli');

exports.command = 'rename <repo> <branch> <new_branch>';
exports.describe = 'Rename a branch for a repository';

exports.builder = {
    force
}

exports.handler = ({ repo, branch, new_branch, force }) => {
    github.testRepo(repo, true);

    const action = () => (
        github.branch
            .rename({ repo, branch, new_branch })
            .then(() => write('Branch renamed'))
            .catch(() => write(`Unable to rename ${branch} on ${repo}`))
    )

    if (force) {
        return action();
    }

    (new confirm('Are you sure you want to rename this branch?'))
        .ask(answer => {
            if (answer) {
                action();
            }
        })
}