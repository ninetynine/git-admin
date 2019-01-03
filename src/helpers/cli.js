exports.force = {
    alias: ['f', 'yes', 'y'],
    type: 'boolean',
    default: false
}

exports.write = function() {
    Array
        .from(arguments)
        .forEach(arg => {
            process.stdout.write(arg);
            process.stdout.write('\n\r');
        })
}