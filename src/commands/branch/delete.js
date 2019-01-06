const confirm = require('prompt-confirm');

const github = require('../../helpers/github');
const { force, write } = require('../../helpers/cli');

exports.command = 'delete <repo> [branch]';
exports.describe = 'Rename a branch for a repository';

exports.builder = {
    force,
    branches: {
        alias: ['b'],
        type: 'array'
    }
}

exports.handler = ({ repo, branch, branches, force }) => {
    github.testRepo(repo, true);

    if (!branch && !branches) {
        return write(
            'At least one branch is required',
            'Use `--branches` or specify a singluar branch after the repository'
        );
    }

    const action = () => {
        if (branches) {
            branches.forEach(branch => (
                github.branch
                    .delete({ repo, branch })
                    .then(() => write(`${branch} deleted`))
                    .catch(() => write(`Unable to delete ${branch} on ${repo}`))
            ))

            return;
        }

        github.branch
            .delete({ repo, branch })
            .then(() => write('Branch deleted'))
            .catch(() => write(`Unable to delete ${branch} on ${repo}`))
    }

    if (force) {
        return action();
    }

    let prompt = new confirm(`Are you sure you want to delete for ${branch} on ${repo}?`);

    if (branches) {
        write(
            `Branches to be deleted for ${repo}:`,
            branches.map(branch => ` - ${branch}`)
        );

        prompt = new confirm('Are you sure?');
    }

    prompt
        .ask(answer => {
            if (answer) {
                action();
            }
        })
}