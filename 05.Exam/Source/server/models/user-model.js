var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = new mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    email: String,
    profilePicture: String,
    salt: String,
    hashPass: String,
    facebookProfile: String,
    youTubeProfile: String,
    rating: [Number]
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
            hashedPwd = encryption.generateHashedPassword(salt, 'doncho');
            User.create({username: 'doncho', firstName: 'Doncho', lastName: 'Minkov', email:'mail@mail.mail', salt: salt, hashPass: hashedPwd, profilePicture: '/images/profile-pictures/default.jpeg', rating: [5,5,4,2,1], facebookProfile: '', youTubeProfile: ''});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'nikiniki');
            User.create({username: 'nikiniki', firstName: 'Nikolay', lastName: 'Kostov', email:'mail@mail.mail', salt: salt, hashPass: hashedPwd, profilePicture: '/images/profile-pictures/default.jpeg', rating: [5,5,4,2,1], facebookProfile: '', youTubeProfile: ''});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'ivoivo');
            User.create({username: 'ivoivo', firstName: 'Ivaylo', lastName: 'Kenov', email:'mail@mail.mail', salt: salt, hashPass: hashedPwd, profilePicture: '/images/profile-pictures/default.jpeg', rating: [5,5,4,2,1], facebookProfile: '', youTubeProfile: ''});

            console.log('Users added to database...');
        }
    });
};