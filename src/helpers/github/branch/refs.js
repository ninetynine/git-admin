exports.get = function ({ repo, ref }) {
	const endpoint = `/repos/${repo}/git/refs/${ref}`;

	return this.request({
		endpoint
	})
}

exports.delete = function ({ repo, ref }) {
	const endpoint = `/repos/${repo}/git/refs/${ref}`;

	return this.request({
		endpoint,
		method: 'DELETE'
	})
}