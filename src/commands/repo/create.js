const github = require('../../helpers/github');

exports.command = 'create <repo>';
exports.describe = 'Create a remote repository';

exports.builder = {
    private: {
        default: false
    }
}

exports.handler = ({ repo, private }) => {
    const matches = github.testRepo(repo);

    if (!matches) {
        throw new Error('Invalid repository given');
    }

    github.repo
        .create({ private, repo: matches[2], org: matches[1] })
        .then(() => console.warn('Repository created'))
        .catch(() => console.warn('Unable to create repository'))
}