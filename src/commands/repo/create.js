const github = require('../../helpers/github');

exports.command = 'create <repo>';
exports.describe = 'Create a remote repository';

exports.builder = {
    private: {
        alias: ['p'],
        type: 'boolean',
        default: false
    }
}

exports.handler = ({ repo, private }) => {
    github.repo
        .create({ ...github.testRepo(repo), private })
        .then(() => console.warn('Repository created'))
        .catch(() => console.warn('Unable to create repository'))
}