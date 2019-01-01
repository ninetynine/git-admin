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

repo.delete = function (repo) {
    const endpoint = `/repos/${repo}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}

module.exports = repo;