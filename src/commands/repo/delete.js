const confirm = require('prompt-confirm');

const github = require('../../helpers/github');
const { force, write } = require('../../helpers/cli');

exports.command = 'delete <repo>';
exports.describe = 'Delete a remote repository';

exports.builder = {
    force
}

exports.handler = ({ force, repo }) => {
    github.testRepo(repo, true);

    const action = () => (
        github.repo
            .delete(repo)
            .then(() => write('Repository deleted'))
            .catch(() => write('Unable to delete repository'))
    )

    if (force) {
        return action();
    }

    (new confirm('Are you sure you want to delete this repository?'))
        .ask(answer => {
            if (answer) {
                action();
            }
        })
}