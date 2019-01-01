const config = require('../helpers/config');

exports.command = 'configure <key> <value>';
exports.describe = 'Set configuration values';
exports.aliases = ['config', 'configuration'];

exports.builder = {
    key: {
        choices: [
            'token'
        ]
    }
}

exports.handler = ({ key, value }) => (
    config.set(key, value)
)