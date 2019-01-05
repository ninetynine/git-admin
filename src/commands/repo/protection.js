const yargs = require('yargs');

exports.command = 'protection <command>';
exports.desc = 'Edit a remote repository\s branch protection';

exports.builder = () => yargs.commandDir('protection');