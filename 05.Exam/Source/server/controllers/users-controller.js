"use strict";

var encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User'),
    xssFilters = require('xss-filters');

module.exports = function() {
    var controller = {
        showRegisterForm: function(req, res){
            if(req.user){
                res.redirect('/');
                return;
            }

            res.render('sign-up', {});
        },

        createUser: function(req, res, next) {
            var errorsMessage = '';
            var newUserData = req.body;
            newUserData.username = xssFilters.inHTMLData(newUserData.username);
            newUserData.password = xssFilters.inHTMLData(newUserData.password);
            newUserData.profilePicture = newUserData.profilePicture || '/images/profile-pictures/default.jpeg';

            if(newUserData.password.length < 6){
                errorsMessage += 'Password is required and must be at least 6 symbols.';
            }

            if(newUserData.email.length < 6){
                errorsMessage += 'Email is required.';
            }

            if(newUserData.username.length < 6){
                errorsMessage += 'Username is required and must be at least 6 symbols.';
            }

            if(newUserData.username.length > 10){
                errorsMessage += 'Username is required and must be less than 10 symbols.';
            }

            if(newUserData.firstName < 1){
                errorsMessage += 'First name is required.';
            }

            if(newUserData.lastName < 1){
                errorsMessage += 'Last name is required.';
            }

            if(errorsMessage.length > 0) {
                res.render('sign-up', {
                    user: req.user,
                    signUpErrors: errorsMessage
                });

                return;
            }

            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            newUserData.points = 0;
            newUserData.roles = ["admin", "standard"];
            User.create(newUserData, function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    res.redirect('/');
                })
            });
        },
        updateUser: function(req, res, next) {
            var user = req.user;
            var updatedUserData = req.body;
            for(var i in updatedUserData){
                if(updatedUserData.hasOwnProperty(i) && updatedUserData[i] === ''){
                    updatedUserData[i] = user[i];
                }
            }

            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.user._id}, updatedUserData, function(error) {
                if(error){
                    console.log(updatedUserData);
                    console.log('Could not update user...' + error);
                    return;
                }

                res.redirect('/api/identity/profile');
            });
        },
        getAllUsers: function(req, res) {
            User.find({}).exec(function(err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }

                res.render('all-users', {
                    user: req.user,
                    users: collection
                });
            })
        },
        showProfilePage:function(req, res){
            res.render('profile', {
                user: req.user
            });
        }
    };

    return controller;
};