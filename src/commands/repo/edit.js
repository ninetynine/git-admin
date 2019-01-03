const confirm = require('prompt-confirm');

const github = require('../../helpers/github');
const { force, write } = require('../../helpers/cli');

exports.command = 'edit <repo>';
exports.describe = 'Edit a remote repository';

exports.builder = {
    force,
    name: {
        alias: ['n'],
        type: 'string'
    },
    description: {
        alias: ['desc', 'd'],
        type: 'string'
    },
    homepage: {
        alias: ['url'],
        type: 'string'
    },
    private: {
        alias: ['p'],
        type: 'boolean'
    },
    'default-branch': {
        type: 'string'
    }
}

exports.handler = argv => {
    const { repo, force } = argv;

    github.testRepo(repo, true);

    const action = () => (
        github.repo
            .edit(argv)
            .then(() => write('Repository edited'))
            .catch(() => write('Unable to edit repository'))
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