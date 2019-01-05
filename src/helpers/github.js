const axios = require('axios');
const parse = require('parse-link-header');

const config = require('./config');

function github() {
    this._token = config.get('token');
    this._base_uri = 'https://api.github.com';

    if (!this._token) {
        throw new Error('A GitHub personal token is required');
    }
}

github.prototype.testRepo = function (repo, require_org = false) {
    const regexp = !require_org
        ? /^([\w-_]+\/)?([\w-_]+)$/
        : /^([\w-_]+\/)([\w-_]+)$/;

    if (!repo) {
        return {
            org: null,
            repo: null
        }
    }

    const matches = repo.match(regexp);

    if (!matches) {
        throw new Error('Invalid repository given');
    }

    const obj = {
        org: matches[1]
            ? matches[1].slice(0, -1)
            : null,
        repo: matches[2]
    }

    return obj;
}

github.prototype.makeUri = function (endpoint) {
    return this._base_uri + endpoint;
}

github.prototype.request = function ({ method = 'get', data = {}, endpoint = '/', headers = {} }) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method, data,
                url: this.makeUri(endpoint),
                headers: {
                    authorization: `token ${this._token}`,
                    'Content-Type': 'application/json',
                    accept: 'application/vnd.github.v3+json',
                    ...headers
                }
            })
            .then(response => {
                const { data } = response;
                const pagination = parse(response.headers.link);

                resolve({ data, pagination });
            })
            .catch(error => reject(error.response.data));
    })
}

github.prototype.repo = require('./github/repo');
github.prototype.branch = require('./github/branch');

const instance = new github;
const bindings = [ github.prototype.repo, github.prototype.branch ];

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