#!/usr/bin/env node
require('./bootstrap');

const yargs = require('yargs');

yargs
    .scriptName('git-admin')
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv