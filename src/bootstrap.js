require('pretty-error').start();

const yargs = require('yargs');

const modules = function(yargs) {
    const os = require('os');
    const path = require('path');
    const fs = require('fs');

    const modules_path = path.join(os.homedir(), '/.git-admin/modules');
    const modules_exist = fs.existsSync(modules_path);

    if (modules_exist) {
        const modules = fs.readdirSync(modules_path);
        
        modules.forEach(dir => (
            yargs.command(
                require(
                    path.join(
                        modules_path,
                        dir
                    )
                )
            )
        ))
    }

    return yargs;
}

yargs
    .scriptName('git-admin')
    .commandDir('commands')
    .demandCommand();

exports.yargs = modules(yargs);