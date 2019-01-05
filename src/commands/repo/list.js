const github = require('../../helpers/github');
const { page, maxPage, write, writeSwitch } = require('../../helpers/cli');

exports.command = 'list';
exports.describe = 'List remote repositories';

exports.builder = {
    page,
    organization: {
        alias: ['org', 'o'],
        type: 'string'
    },
    user: {
        alias: ['u'],
        type: 'string'
    },
    visibility: {
        alias: ['v'],
        choices: ['all', 'public', 'private'],
        type: 'string'
    },
    affiliation: {
        alias: ['a'],
        choices: ['owner', 'collaborator', 'organization_member'],
        type: 'array'
    },
    type: {
        alias: ['t'],
        choices: ['all', 'owner', 'public', 'private', 'member', 'forks', 'sources'],
        type: 'string'
    },
    sort: {
        alias: ['s'],
        choices: ['created', 'updated', 'pushed', 'full_name'],
        type: 'string',
    },
    direction: {
        alias: ['d'],
        choices: ['asc', 'desc'],
        type: 'string'
    }
}

exports.handler = argv => {
    const { organization, user, page } = argv;
    const not_self =
        organization || user
            ? `for ${organization||user}`
            : '';

    github.repo
        .list(argv)
        .then(({ data, pagination }) => {
            const max_page = maxPage({ page, pagination });
            const pages = () => write(`Page ${page} ${max_page}`);

            pages();
            write();

            writeSwitch(
                !data.length,
                `No repositories found ${not_self}`,
                data.map(repo => `- ${repo.full_name}`)
            );

            write();
            pages();
        })
        .catch(() => write(`Unable to list repositories ${not_self}`))
}