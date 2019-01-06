exports.user = require('./user');
exports.commits = require('./commits');

exports.list = function ({ user, organization, visibility, affiliation, type, sort, direction, page }) {
    let endpoint = '/user/repos';

    const query = [];
    const has_query = visibility || affiliation || type || sort || direction || page;

    if (organization) {
        endpoint = `/orgs/${organization}/repos`;
    } else if (user) {
        endpoint = `/users/${user}/repos`;
    }

    if (visibility) {
        query.push(`visibility=${visibility}`);
    }

    if (affiliation) {
        query.push(`affiliation=${affiliation}`);
    }

    if (type) {
        query.push(`type=${type}`);
    }

    if (sort) {
        query.push(`sort=${sort}`);
    }

    if (direction) {
        query.push(`direction=${direction}`);
    }

    if (page) {
        query.push(`page=${page}`);
    }

    if (has_query) {
        endpoint += '?' + query.join('&');
    }

    return this.request({
        endpoint
    })
}

exports.create = function ({ repo: name, private, org }) {
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

exports.edit = function ({ repo, name, description, homepage, private, 'default-branch': default_branch }) {
    const endpoint = `/repos/${repo}`;
    const data = { name: repo };

    if (typeof name === 'string') {
        data.name = name;
    }

    if (typeof description === 'string') {
        data.description = description;
    }

    if (typeof homepage === 'string') {
        data.homepage = homepage;
    }

    if (typeof private === 'boolean') {
        data.private = private;
    }

    if (typeof default_branch === 'string') {
        data.default_branch = default_branch;
    }

    data.name = this.testRepo(data.name).repo;

    return this.request({
        data, endpoint,
        method: 'patch'
    })
}

exports.delete = function (repo) {
    const endpoint = `/repos/${repo}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}