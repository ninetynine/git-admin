const axios = require('axios');
const config = require('./config');

function github() {
    this._token = config.get('token');
    this._base_uri = 'https://api.github.com';

    if (!this._token) {
        throw new Error('A GitHub personal token is required');
    }

    this.makeUri = this.makeUri.bind(this);
    this.request = this.request.bind(this);
}

github.prototype.testRepo = function (repo) {
    return repo.match(/^([\w-_]+\/)?([\w-_]+)$/);
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
                    authorization: `token ${this._token}`
                }
            })
            .then(response => resolve(response.data))
            .catch(reject);
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

const instance = new github;
const bindings = [ github.prototype.repo ];

bindings.forEach(obj => (
    Object.keys(obj).forEach(key => (
        obj[key] = obj[key].bind(instance)
    ))
))

module.exports = instance;