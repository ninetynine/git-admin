const axios = require('axios');
const config = require('./config');

function github() {
    this._token = config.get('token');
    this._base_uri = 'https://api.github.com';

    if (!this._token) {
        throw new Error('A GitHub personal token is required');
    }
}

github.prototype.testRepo = function (repo) {
    const matches = repo.match(/^([\w-_]+\/)?([\w-_]+)$/);

    if (!matches) {
        throw new Error('Invalid repository given');
    }

    const obj = {
        org: matches[1].slice(0, -1),
        repo: matches[2]
    }

    return obj;
}

github.prototype.makeUri = function (endpoint) {
    return this._base_uri + endpoint;
}

github.prototype.request = function ({ method = 'get', data = {}, endpoint = '/' }) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method, data,
                url: this.makeUri(endpoint),
                headers: {
                    authorization: `token ${this._token}`,
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data));
    })
}

github.prototype.repo = {};
github.prototype.repo.create = function ({ repo: name, private, org }) {
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

github.prototype.repo.user = {};
github.prototype.repo.user.invite = function ({ user, repo, permissions: permission }) {
    const endpoint = `/repos/${repo}/collaborators/${user}`;
    const data = { permission };

    return this.request({
        data, endpoint,
        method: 'put'
    })
}

github.prototype.repo.user.remove = function ({ user, repo, permissions: permission }) {
    const endpoint = `/repos/${repo}/collaborators/${user}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}

const instance = new github;
const bindings = [ github.prototype.repo ];

const loop = obj => (
    Object.entries(obj).forEach(([key, fn]) => {
        if (typeof fn === 'function') {
            return obj[key] = fn.bind(instance);
        }

        if (typeof fn === 'object') {
            loop(fn);
        }
    })
)

bindings.forEach(loop)

module.exports = instance;