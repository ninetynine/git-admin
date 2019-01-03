exports.force = {
    alias: ['f', 'yes', 'y'],
    type: 'boolean',
    default: false
}

exports.page = {
    alias: ['p'],
    type: 'number',
    default: 1
}

exports.private = {
    alias: ['p'],
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