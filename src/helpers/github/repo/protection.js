const { write, writeGroup, writeSwitch } = require('../../cli');

// API is currently in preview

exports.set = function ({ repo, branch, data }) {
    const endpoint = `/repos/${repo}/branches/${branch}/protection`;

    return this.request({
        data, endpoint,
        method: 'PUT',
        headers: {
            accept: 'application/vnd.github.luke-cage-preview+json'
        }
    })
}

exports.remove = function ({ repo, branch }) {
    const endpoint = `/repos/${repo}/branches/${branch}/protection`;

    return this.request({
        endpoint,
        method: 'DELETE',
        headers: {
            accept: 'application/vnd.github.luke-cage-preview+json'
        }
    })
}

exports.make = function (argv) {
    const data = {};

    // Enforce admins
    const { enforce_admins } = argv;

    data.enforce_admins = null;
    if (enforce_admins) {
        data.enforce_admins = true;
    }

    // Status checks
    const {
        strict_required_status_checks,
        status_check_contexts
    } = argv;

    let required_status_checks = null;
    const has_sc_options = 
        strict_required_status_checks !== undefined
        || status_check_contexts;
    
    if (has_sc_options) {
        required_status_checks = {};

        required_status_checks.strict
            = !!strict_required_status_checks;

        if (status_check_contexts !== undefined) {
            required_status_checks.contexts
                = status_check_contexts;
        } else {
            required_status_checks.contexts = [];
        }
    }

    data.required_status_checks
        = required_status_checks;

    // Pull requests
    const {
        dismissal_restrict_users, dismissal_restrict_teams,
        dismiss_stale_reviews, require_code_owner_reviews,
        required_approving_review_count
    } = argv;

    let required_pull_request_reviews = null;
    const has_pr_options =
        dismissal_restrict_users
        || dismissal_restrict_teams
        || dismiss_stale_reviews
        || require_code_owner_reviews
        || required_approving_review_count;

    if (has_pr_options) {
        required_pull_request_reviews = {};

        if (dismissal_restrict_users || dismissal_restrict_teams) {
            const dismissal_restrictions = {
                users: [],
                teams: []
            }

            if (dismissal_restrict_users) {
                dismissal_restrictions.users
                    = dismissal_restrict_users;
            }

            if (dismissal_restrict_teams) {
                dismissal_restrictions.teams
                    = dismissal_restrict_teams;
            }

            required_pull_request_reviews.dismissal_restrictions
                = dismissal_restrictions;
        } else {
            required_pull_request_reviews.dismissal_restrictions = {};
        }

        if (dismiss_stale_reviews !== undefined) {
            required_pull_request_reviews.dismiss_stale_reviews
                = dismiss_stale_reviews;
        }

        if (require_code_owner_reviews !== undefined) {
            required_pull_request_reviews.require_code_owner_reviews
                = require_code_owner_reviews;
        }

        if (required_approving_review_count >= 1) {
            required_pull_request_reviews.required_approving_review_count
                = required_approving_review_count <= 6 
                    ? required_approving_review_count : 6;
        }
    }

    data.required_pull_request_reviews
        = required_pull_request_reviews;

    // Restrictions
    const {
        restrict_users,
        restrict_teams
    } = argv;

    let restrictions = null;
    const has_r_options = 
        restrict_users
        || restrict_teams;

    if (has_r_options) {
        restrictions = {
            users: [],
            teams: []
        };

        if (restrict_users !== undefined) {
            restrictions.users
                = restrict_users;
        }

        if (restrict_teams !== undefined) {
            restrictions.teams
                = restrict_teams;
        }
    }

    data.restrictions
        = restrictions;

    return data;
}

exports.read = function (data) {
    writeGroup('New permissions:');

    if (data.required_status_checks === null) {
        write('- Status checks will not be required');
    } else {
        const { strict, contexts } = data.required_status_checks;
        write(`- Status checks will ${!strict ? 'not ' : ''}be strict`);

        write(`- ${contexts.length} status check(s) will be required`);
        write(...contexts.map(context => `  - ${context}`));
    }

    write(`- Admins will be ${!data.enforce_admins ? 'not ' : ''}required to follow the restrictions`);
    
    if (data.required_pull_request_reviews === null) {
        write('- Pull request reviews will not be required');
    } else {
        const {
            dismissal_restrictions, dismiss_stale_reviews,
            require_code_owner_reviews, required_approving_review_count
        } = data.required_pull_request_reviews;

        if (Object.keys(dismissal_restrictions).length) {
            const { users, teams } = dismissal_restrictions;

            if (users) {
                write(`- ${users.length} user(s) will be able to dismiss pull request reviews`);
                write(...users.map(user => `  - ${user}`));
            }

            if (teams) {
                write(`- ${teams.length} team(s) will be able to dismiss pull request reviews`);
                write(...teams.map(team => `  - ${team}`));
            }
        } else {
            write(`- No users or teams will be able to dismiss pull request reviews`);
        }

        write(`- Stale reviews will ${!dismiss_stale_reviews ? 'not ' : ''}be dismissed on new commits`);
        write(`- Pull requests will ${!require_code_owner_reviews ? 'not ' : ''}be blocked until code owners review them`);
        
        writeSwitch(
            !required_approving_review_count,
            '- No reviews will be required before merging',
            `- ${required_approving_review_count} reviews will be required before merging`
        )
    }

    if (data.restrictions === null) {
        write('- Any members/contributors will be able to push to this branch');
    } else {
        const { users, teams } = data.restrictions;

        if (users) {
            write(`- Only ${users.length} user(s) will be able to push to this branch`);
            write(...users.map(user => `  - ${user}`));
        }

        if (teams) {
            write(`- Only ${teams.length} team(s) will be able to push to this branch`);
            write(...teams.map(team => `  - ${team}`));
        }
    }
}