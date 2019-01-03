const github = require('../../helpers/github');
const { write } = require('../../helpers/cli');

exports.command = 'list';
exports.describe = 'List remote repositories';

exports.builder = {
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
    },
    page: {
        alias: ['p'],
        type: 'number',
        default: 1
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
            const max_page = 
                pagination && pagination.last
                    ? `of ${pagination.last.page}` 
                    : `of ${page}`;

            const pages = () => write(`Page ${page} ${max_page}`);

            pages();
            write('');

            if (!data.length) {
                write(`No repositories found ${not_self}`);
            } else {
                data.forEach(repo => write(repo.full_name));
            }

            write('');
            pages();
        })
        .catch(error => write(`Unable to list repositories ${not_self}`, JSON.stringify(error)))
}