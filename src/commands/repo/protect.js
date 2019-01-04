exports.command = 'protect <repo> <branch>';
exports.desc = 'Edit a remote repository\s branch protection';

exports.builder = {

    // Status checks
    strict_required_status_checks: {
        alias: ['strict-status-checks', 'srsc', 'ssc'],
        type: 'boolean'
    },
    required_status_checks: {
        alias: ['status-checks', 'rsc', 'sc'],
        type: 'array'
    },

    // Pull requests
    dismissal_restrict_users: {
        alias: ['restrict-users', 'dru', 'ru'],
        type: 'array'
    },
    dismissal_restrict_teams: {
        alias: ['restrict-teams', 'drt', 'rt'],
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

    // Other
    restrictions: {
        alias: ['restrict', 'r']
    },
    enforce_admins: {
        alias: ['ea', 'a'],
        type: 'boolean',
        default: false
    }
}

exports.handler = argv => {

    // Pull requests
    const {
        dismissal_restrict_users, dismissal_restrict_teams,
        dismiss_stale_reviews, require_code_owner_reviews,
        required_approving_review_count
    } = argv;

    let required_pull_request_reviews = null;
    const has_pr_options = dismissal_restrict_users
        || dismissal_restrict_teams
        || dismiss_stale_reviews
        || require_code_owner_reviews
        || required_approving_review_count;

    if (has_pr_options) {
        required_pull_request_reviews = {};

        // Dismissal restrictions
        if (dismissal_restrict_users || dismissal_restrict_teams) {
            const dismissal_restrictions = {
                users: [],
                teams: []
            }

            if (dismissal_restrict_users) {
                restricted.users = dismissal_restrict_users;
            }

            if (dismissal_restrict_teams) {
                restricted.teams = dismissal_restrict_teams;
            }

            required_pull_request_reviews.dismissal_restrictions
                = dismissal_restrictions;
        }
    }
}