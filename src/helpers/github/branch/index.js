exports.protection = require('./protection');
exports.refs = require('./refs');

exports.create = async function ({ repo, new_branch, base_branch }) {
	const endpoint = `/repos/${repo}/git/refs`;
	const data = {
		ref: `refs/heads/${new_branch}`,
		sha: null
	};

	const { data: base } = await this.branch.refs.get({
		repo, ref: `heads/${base_branch||'master'}`
	})

	data.sha = base.object.sha;

	return this.request({
		data, endpoint,
		method: 'POST'
	})
}

exports.rename = async function ({ repo, branch: base_branch, new_branch }) {
	await this.branch.create({
		repo, new_branch, base_branch
	})

	await this.branch.refs.delete({
		repo, ref: `heads/${base_branch||'master'}`
	})

	return new Promise(resolve => (
		resolve()
	));
}

exports.delete = function ({ repo, branch }) {
	return this.branch.refs.delete({
		repo, ref: `heads/${branch}`
	})
}

exports.list = function ({ repo, page }) {
	let endpoint = `/repos/${repo}/branches`;

	if (page) {
		endpoint += `?page=${page}`;
	}

	return this.request({
		endpoint
	})
}