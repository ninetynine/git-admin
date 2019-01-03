const github = require('../../helpers/github');
const { write } = require('../../../helpers/cli');

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
        .then(() => write('Repository created'))
        .catch(() => write('Unable to create repository'))
}