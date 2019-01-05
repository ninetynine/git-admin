const confirm = require('prompt-confirm');

const github = require('../../../helpers/github');
const { force, write } = require('../../../helpers/cli');

exports.command = 'remove <repo> [branch]';
exports.desc = 'Remove a remote repository\s branch protection';

exports.builder = {
    force,
    branches: {
        aliases: ['b'],
        type: 'array'
    }
}

exports.handler = ({ repo, branch, branches, force }) => {
    if (!branch && !branches) {
        return write(
            'At least one branch is required',
            'Use `--branches` or specify a singluar branch after the repository'
        );
    }

    const action = () => {
        if (branches) {
            branches.forEach(branch => (
                github.repo.protection
                    .remove({ repo, branch })
                    .then(() => write(`Permissions removed for ${branch}`))
                    .catch(() => write(`Unable to remove permissions for ${branch}`))
            ))

            return;
        }

        github.branch.protection
            .remove({ repo, branch })
            .then(() => write('Permissions removed'))
            .catch(() => write('Unable to remove permissions'))
    }

    if (force) {
        return action();
    }

    let prompt = new confirm(`Are you sure you want to remove permissions for ${branch} on ${repo}?`);

    if (branches) {
        write(
            `Branches to be updated for ${repo}:`,
            branches.map(branch => ` - ${branch}`)
        );

        prompt = new confirm('Are you sure?');
    }
    
    prompt
        .ask(answer => {
            if (answer) {
                action();
            }
        });
}