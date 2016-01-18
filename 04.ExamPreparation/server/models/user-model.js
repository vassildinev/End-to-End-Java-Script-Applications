var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String],
    points: Number
});

userSchema.method({
    authenticate: function(password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'vassildinev');
            User.create({username: 'vassildinev', firstName: 'Vasil', lastName: 'Dinev', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'nikiniki');
            User.create({username: 'nikiniki', firstName: 'Nikolay', lastName: 'Kostov', salt: salt, hashPass: hashedPwd, roles: ['standard']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'ivoivo');
            User.create({username: 'ivoivo', firstName: 'Ivaylo', lastName: 'Kenov', salt: salt, hashPass: hashedPwd});

            console.log('Users added to database...');
        }
    });
};