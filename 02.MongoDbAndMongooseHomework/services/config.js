(function(){
    "use strict";
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/chatdb');

    var db = mongoose.connection;

    db.on('error', function(){
        console.error('Cannot establish connection to database');
    });

    db.once('open', function(){
        console.log('Successfully connected to database');
    });

    var userSchema = mongoose.Schema({
        username: String,
        pass: String
    });

    var messageSchema = mongoose.Schema({
        from: String,
        to: String,
        text: String
    });

    var User = mongoose.model('User', userSchema);
    var Message = mongoose.model('Message', messageSchema);

    module.exports = {
        User: User,
        Message: Message
    }
}());