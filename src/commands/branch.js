const yargs = require('yargs');

exports.command = 'branch <command>';
exports.desc = 'Manage remote repository branches';

exports.builder = () => yargs.commandDir('branch');