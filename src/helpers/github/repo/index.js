const repo = {};

repo.user = require('./user');

repo.create = function ({ repo: name, private, org }) {
    let endpoint = `/user/repos`;

    const data = { name, private };

    if (org) {
        endpoint = `/orgs/${org}/repos`;
    }

    return this.request({ 
        data, endpoint,
        method: 'post'
    })
}

repo.edit = function ({ repo, name, private }) {
    const endpoint = `/repos/${repo}`;
    const data = { name: repo };

    if (typeof name === 'string') {
        data.name = name;
    }

    if (typeof private === 'boolean') {
        data.private = private;
    }

    data.name = this.testRepo(data.name).repo;

    return this.request({
        data, endpoint,
        method: 'patch'
    })
}

repo.delete = function (repo) {
    const endpoint = `/repos/${repo}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}

module.exports = repo;