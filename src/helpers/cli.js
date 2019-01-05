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

exports.maxPage = function({ page, pagination }) {
    return pagination && pagination.last
        ? `of ${pagination.last.page}` 
        : `of ${page}`;
}

exports.write = write = function() {
    const output = Array.from(arguments);

    if (!output.length || output[0] === null) {
        output.push('');
    }
        
    output.forEach(arg => {
        process.stdout.write(arg);
        process.stdout.write('\n\r');
    })
}

exports.writeGroup = function() {
    write(...arguments);
    write();
}

exports.writeSwitch = function(expression, truthy, falsey) {
    if (expression) {
        if (Array.isArray(truthy)) {
            return write(...truthy);
        }

        return write(truthy);
    }

    if (Array.isArray(falsey)) {
        return write(...falsey);
    }

    return write(falsey);
}