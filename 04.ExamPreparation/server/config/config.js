var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/test-db',
        port: process.env.PORT || 5050
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://localhost/test-db',
        port: process.env.PORT || 5050
    }
};