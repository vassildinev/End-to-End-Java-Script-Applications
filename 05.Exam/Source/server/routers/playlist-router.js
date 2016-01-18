"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    controller = require('../controllers/playlists-controller')(),
    auth = require('../config/auth');

router.get('/', auth.isAuthenticated, controller.loadAllPlaylistsPage);
router.get('/create', auth.isAuthenticated, controller.loadCreatePlaylistPage);
router.get('/:id', auth.isAuthenticated, controller.loadPlaylistDetails);
router.get('/:id/add-video', auth.isAuthenticated, controller.loadAddVideo);
router.get('/:id/add-comment', auth.isAuthenticated, controller.loadAddComment);
router.post('/create', auth.isAuthenticated, controller.createPlaylist);
router.post('/:id/add-video', auth.isAuthenticated, controller.addVideoToPlaylist);
router.post('/:id/add-comment', auth.isAuthenticated, controller.addCommentToPlaylist);
router.post('/:id/rate', auth.isAuthenticated, controller.ratePlaylist);
router.post('/:id/add-editor', auth.isAuthenticated, controller.addEditorToPlaylist);

module.exports = function(app){
    app.use('/api/playlists', router);
};