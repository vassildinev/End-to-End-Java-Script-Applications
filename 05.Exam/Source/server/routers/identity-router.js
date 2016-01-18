"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    controller = require('../controllers/users-controller')(),
    auth = require('../config/auth');

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/signup', controller.showRegisterForm);
router.post('/users', controller.createUser);
router.post('/users/update', auth.isAuthenticated, controller.updateUser);
router.get('/users', auth.isInRole('admin'), controller.getAllUsers);
router.get('/profile', auth.isAuthenticated, controller.showProfilePage);

module.exports = function(app){
    app.use('/api/identity', router);
};