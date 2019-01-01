const yargs = require('yargs');

exports.command = 'user <command>';
exports.desc = 'Manage remote repository users';

exports.builder = () => yargs.commandDir('user');