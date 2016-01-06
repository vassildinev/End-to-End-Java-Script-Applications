(function(){
    "use strict";
    var models = require('./config.js');

    var registerUser = function registerUser(user){
        return models.User.findOne({username: user.username}, function(error, userResult){
            if(userResult){
                console.log('User already exists');
            } else {
                var dbUser = new models.User({
                    username: user.username,
                    pass: user.pass
                });

                dbUser.save(function(error, dbUser){
                    if(error){
                        console.error('Could not register user: ' + error);
                    } else {
                        console.log('User registered successfully');
                    }
                });
            }
        });
    };

    var sendMessage = function sendMessage(message){
        return models.User.find({$or:[{username: message.from}, {username: message.to}]}, function(error, users){
            if(users.length !== 2) {
                console.log('Some user does not exist');
            } else {
                var dbMessage = new models.Message({
                    from: message.from,
                    to: message.to,
                    text: message.text
                });

                dbMessage.save(function(error, dbMessage){
                    if(error){
                        console.error('Could not send message: ' + error);
                    } else {
                        console.log('Message sent successfully');
                    }
                });
            }
        })
    };

    var getMessages = function getMessages(messageParams){
        return models.Message.find({$or:[{from: messageParams.with, to: messageParams.and},
                                         {to: messageParams.with, from: messageParams.and}]},
            function(error, messages){
                if(error){
                    console.error('An error occurred while fetching the messages');
                } else {
                    console.log(messages);
                }
            });
    };

    var showAllUsers  = function showAllUsers(){
        return models.User.find({}, function(error, users){
            if(error) {
                console.error('Could not fetch all users');
            } else {
                console.log(users);
            }
        })
    };

    module.exports = {
        registerUser: registerUser,
        sendMessage: sendMessage,
        showAllUsers: showAllUsers,
        getMessages: getMessages
    }
}());