const user = {};

user.invite = function ({ user, repo, permissions: permission }) {
    const endpoint = `/repos/${repo}/collaborators/${user}`;
    const data = { permission };

    return this.request({
        data, endpoint,
        method: 'put'
    })
}

user.remove = function ({ user, repo }) {
    const endpoint = `/repos/${repo}/collaborators/${user}`;

    return this.request({
        endpoint,
        method: 'delete'
    })
}

module.exports = user;