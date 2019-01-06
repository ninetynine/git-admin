const yargs = require('yargs');

exports.command = 'commit <command>';
exports.desc = 'Manage remote repository commits';

exports.builder = () => yargs.commandDir('commit');