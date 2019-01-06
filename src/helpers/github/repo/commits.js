const date = require('dayjs');

exports.list = function ({ repo, sha, path, author, since, until, page }) {
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