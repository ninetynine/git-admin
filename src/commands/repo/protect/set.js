const confirm = require('prompt-confirm');

const github = require('../../../helpers/github');
const { force, write } = require('../../../helpers/cli');
const { make, read } = require('../../../helpers/github/repo/protect');

exports.command = 'set <repo> <branch>';
exports.desc = 'Set a remote repository\s branch protection';

exports.builder = {
    force,

    // Status checks
    strict_required_status_checks: {
        alias: ['strict-status-checks', 'strict', 'srsc', 'ssc'],
        type: 'boolean'
    },
    status_check_contexts: {
        alias: ['status-checks', 'contexts', 'rsc', 'sc'],
        type: 'array'
    },

    // Pull requests
    dismissal_restrict_users: {
        alias: ['dismissal-restrict-users', 'dru'],
        type: 'array'
    },
    dismissal_restrict_teams: {
        alias: ['dismissal-restrict-teams', 'drt'],
        type: 'array'
    },
    dismiss_stale_reviews: {
        alias: ['dismiss-reviews', 'dsr', 'dr'],
        type: 'boolean'
    },
    require_code_owner_reviews: {
        alias: ['code-owner-review', 'owner-review', 'code-owner', 'rcor', 'or', 'co'],
        type: 'boolean'
    },
    required_approving_review_count: {
        alias: ['approving-review-count', 'review-count', 'arc', 'rc'],
        type: 'number'
    },

    // Push restrictions
    restrict_users: {
        alias: ['restrict-users', 'ru'],
        type: 'array'
    },
    restrict_teams: {
        alias: ['restrict-teams', 'rt'],
        type: 'array'
    },

    // Other
    enforce_admins: {
        alias: ['enforce-admins', 'ea'],
        type: 'boolean'
    }
}

exports.handler = ({ repo, branch, force, ...argv }) => {
    const data = make(argv);

    read(data);
    write();

    const action = () => {
        github.repo
            .protect({ repo, branch, data })
            .then(() => write(`Permissions updated`))
            .catch(error => console.warn(error));
    }

    if (force) {
        return action();
    }
    
    (new confirm(`Are you sure you want to update permissions for ${branch} on ${repo}?`))
        .ask(answer => {
            if (answer) {
                action();
            }
        });
}