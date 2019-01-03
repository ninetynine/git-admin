const github = require('../../helpers/github');
const { private, write } = require('../../helpers/cli');

exports.command = 'create <repo>';
exports.describe = 'Create a remote repository';

exports.builder = {
    private
}

exports.handler = ({ repo, private }) => {
    github.repo
        .create({ ...github.testRepo(repo), private })
        .then(() => write('Repository created'))
        .catch(() => write('Unable to create repository'))
}