const yargs = require('yargs');

exports.command = 'protect <command>';
exports.desc = 'Edit a remote repository\s branch protection';

exports.builder = () => yargs.commandDir('protect');