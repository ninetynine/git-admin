const date = require('dayjs');
const repo = {};

repo.user = require('./user');

repo.list = function ({ user, organization, visibility, affiliation, type, sort, direction, page }) {
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

repo.edit = function ({ repo, name, description, homepage, private, 'default-branch': default_branch }) {
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

repo.delete = function (repo) {
    const endpoint = `/repos/${repo}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}

repo.commits = function ({ repo, sha, path, author, since, until, page }) {
    let endpoint = `/repos/${repo}/commits`;

    const query = [];
    const has_query = sha || path || author || since || until || page;

    if (sha) {
        query.push(`sha=${sha}`);
    }

    if (path) {
        query.push(`path=${path}`);
    }

    if (author) {
        query.push(`author=${author}`);
    }

    if (since) {
        query.push(`since=${date(since).toISOString()}`);
    }

    if (until) {
        query.push(`until=${date(until).toISOString()}`);
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

repo.protect = function ({ repo, branch, data }) {
    const endpoint = `/repos/${repo}/branches/${branch}/protection`;

    return this.request({
        data, endpoint,
        method: 'PUT',
        headers: {

            // API is currently in preview
            accept: 'application/vnd.github.luke-cage-preview+json'
        }
    })
}

module.exports = repo;