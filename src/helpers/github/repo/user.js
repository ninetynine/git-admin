const user = {};

user.add = function ({ user, repo, permissions: permission }) {
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

user.list = function ({ repo, page }) {
    let endpoint = `/repos/${repo}/collaborators`;

    if (page) {
        endpoint += `?page=${page}`;
    }

    return this.request({
        endpoint
    })
}

module.exports = user;