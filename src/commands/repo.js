const yargs = require('yargs');

exports.command = 'repo <command>';
exports.desc = 'Manage remote repositories';

exports.builder = () => yargs.commandDir('repo');