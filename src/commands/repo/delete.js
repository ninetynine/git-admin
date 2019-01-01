const confirm = require('prompt-confirm');

const cli = require('../../helpers/cli');
const github = require('../../helpers/github');

exports.command = 'delete <repo>';
exports.describe = 'Delete a remote repository';

exports.builder = {
    force: cli.force
}

exports.handler = ({ force, repo }) => {
    github.testRepo(repo, true);

    const action = () => (
        github.repo
            .delete(repo)
            .then(() => console.warn('Repository deleted'))
            .catch(() => console.warn('Unable to delete repository'))
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