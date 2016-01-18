"use strict";

var Playlist = require('mongoose').model('Playlist');
var cachedPlaylists;

module.exports = function(){
    return {
        loadHomePage: function(req, res){
            var user = req.user;
            if(!cachedPlaylists || new Date() - cachedPlaylists.cacheDate >= 10 * 60 * 1000) { // 10 min * 60 sec * 1000 msec
                Playlist
                    .find({isPrivate: false})
                    .exec(function (error, playlists) {
                        if (error) {
                            console.log('Could not fetch playlists...');
                            return;
                        }

                        var playlistsCopy = playlists.slice(0);

                        playlistsCopy
                            .sort(function(a, b){
                                if((a.rating / a.totalRatings).toFixed(1) < (b.rating / b.totalRatings).toFixed(1)) {
                                    return 1;
                                } else if((a.rating / a.totalRatings).toFixed(1) > (b.rating / b.totalRatings).toFixed(1)){
                                    return -1;
                                } else {
                                    return 0;
                                }

                            });

                        cachedPlaylists = {
                            cacheDate: new Date(),
                            playlists: playlistsCopy.slice(0, 8)
                        };

                        res.render('home', {
                            user: user,
                            playlists: cachedPlaylists.playlists
                        });
                    });
            } else {
                res.render('home', {
                    user: user,
                    playlists: cachedPlaylists.playlists
                });
            }
        },

        loadNotFoundPage: function(req, res){
            var user = req.user;
            res.render('shared/not-found', {
                user: user
            });
        },


        loadUnauthorizedPage: function(req, res){
            res.render('shared/unauthorized', {});
        }
    };
};