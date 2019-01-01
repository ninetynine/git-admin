const confirm = require('prompt-confirm');

const cli = require('../../helpers/cli');
const github = require('../../helpers/github');

exports.command = 'edit <repo>';
exports.describe = 'Edit a remote repository';

exports.builder = {
    force: cli.force,
    name: {
        alias: ['n'],
        type: 'string'
    },
    private: {
        alias: ['p'],
        type: 'boolean'
    }
}

exports.handler = ({ force, repo, name, private }) => {
    github.testRepo(repo, true);

    const action = () => (
        github.repo
            .edit({ repo, name, private })
            .then(() => console.warn('Repository edited'))
            .catch(() => console.warn('Unable to edit repository'))
    )

    if (force) {
        return action();
    }

    (new confirm('Are you sure you want to edit this repository?'))
        .ask(answer => {
            if (answer) {
                action();
            }
        })
}