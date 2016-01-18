"use strict";

var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist'),
    User = mongoose.model('User');
var xssFilters = require('xss-filters');

var PAGE_SIZE = 10;
var PAGE = 1;

module.exports = function(){
    return {
        loadCreatePlaylistPage: function(req, res){
            var user = req.user;
            res.render('playlists/create-playlist', {
                user: user
            });
        },
        loadAllPlaylistsPage: function(req, res){
            var user = req.user;
            var page = req.query.page || PAGE;
            console.log(req.query);
            var orderBy = req.query.orderBy;
            var keyword = req.query.titleOrDescription;
            var category = req.query.category;

            Playlist.find({}, function(error, playlists){
                var userPlaylists = [];
                for(var i = 0; i < playlists.length; i += 1){
                    let currentPlaylist = playlists[i];
                    if(currentPlaylist.visibleTo.indexOf(user.username) > -1 ||
                            currentPlaylist.creator === user.username ||
                            !currentPlaylist.isPrivate){
                        userPlaylists.push(currentPlaylist);
                    }
                }

                var playlistsCopy = userPlaylists.slice(0);

                if(orderBy && orderBy !== '') {
                    if (orderBy == 'rating') {
                        playlistsCopy
                            .sort(function (a, b) {
                                if ((a.rating / a.totalRatings).toFixed(1) < (b.rating / b.totalRatings).toFixed(1)) {
                                    return 1;
                                } else if ((a.rating / a.totalRatings).toFixed(1) > (b.rating / b.totalRatings).toFixed(1)) {
                                    return -1;
                                } else {
                                    return 0;
                                }

                            });
                    } else {
                        playlistsCopy
                            .sort(function (a, b) {
                                if (a.creationDate < b.creationDate) {
                                    return 1;
                                } else if (a.creationDate > b.creationDate) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                    }
                }

                if(category && category !== '') {
                    playlistsCopy = playlistsCopy.filter(function(x){
                        return x.category === category;
                    });
                }

                if(keyword && keyword !== ''){
                    playlistsCopy = playlistsCopy.filter(function(x){
                        return x.title.indexOf(keyword) > -1 || x.description.indexOf(keyword) > -1;
                    });
                }

                res.render('playlists/all-playlists', {
                    user: req.user,
                    playlists: playlistsCopy.slice((page - 1) * 10, (page - 1) * 10 + 10),
                    pages: (playlistsCopy.length / PAGE_SIZE | 0) + 1
                });
            });
        },
        loadPlaylistDetails: function(req, res){
          Playlist.findOne({ _id: req.params.id }, function(error, playlist){
              if(error){
                  console.log('Could not fetch playlist...');
                  return;
              }

              res.render('playlists/playlist-details', {
                  user: req.user,
                  playlist: playlist
              });
          });
        },
        createPlaylist: function(req, res){
            var creator = req.user.username;
            var newPlaylist = req.body;
            newPlaylist.title = xssFilters.inHTMLData(newPlaylist.title);
            newPlaylist.description = xssFilters.inHTMLData(newPlaylist.description);
            newPlaylist.creator = creator;
            newPlaylist.videoUrls = [];
            newPlaylist.creationDate = new Date();
            newPlaylist.visibleTo = [];
            newPlaylist.isPrivate = newPlaylist.isPrivate || false;
            newPlaylist.comments = [];
            newPlaylist.rating = 0;
            newPlaylist.totalRatings = 0;

            Playlist.create(newPlaylist, function(error, playlist){
                if(error) {
                    console.log('Could not create user...');
                    return;
                }

                res.redirect('/api/playlists/' + playlist._id);
            });
        },
        loadAddVideo: function(req, res){
            var playlistId = req.params.id;
            Playlist.findById(playlistId, function(error, playlist){
                if(error){
                    console.log('Could not fetch playlist...');
                    return;
                }

                res.render('playlists/add-video-to-playlist', {
                    user: req.user,
                    playlist: playlist
                });
            });
        },
        loadAddComment: function(req, res){
            var playlistId = req.params.id;
            Playlist.findById(playlistId, function(error, playlist){
                if(error){
                    console.log('Could not fetch playlist...');
                    return;
                }

                res.render('playlists/add-comment-to-playlist', {
                    user: req.user,
                    playlist: playlist
                });
            });
        },
        addVideoToPlaylist: function(req, res){
            var playlistId = req.params.id;
            var video = req.body;
            Playlist.findById(playlistId, function(error, playlist){
                if(error){
                    console.log('Could not fetch playlist...');
                    return;
                }

                playlist.videoUrls.push(video.url);
                playlist.save();

                res.redirect('/api/playlists/' + playlistId);
            });
        },
        addCommentToPlaylist: function(req, res){
            var playlistId = req.params.id;
            var commentText = req.body.commentText;
            var comment = {
                author: req.user.username,
                text: commentText
            };

            Playlist.findById(playlistId, function(error, playlist){
                if(error){
                    console.log('Could not fetch playlist...');
                    return;
                }

                if(playlist.comments[playlist.comments.length - 1].author === comment.author){
                    res.render('playlists/add-comment-to-playlist', {
                        user: req.user,
                        playlist: playlist,
                        errors: "You cannot comment twice in a row"
                    });

                    return;
                }

                playlist.comments.push(comment);
                playlist.save();

                res.redirect('/api/playlists/' + playlistId);
            });
        },
        ratePlaylist: function(req, res){
            var playlistId = req.params.id;
            var newRating = Number(req.body.rating);
            Playlist.findById(playlistId, function(error, playlist){
                if(error){
                    console.log('Could not fetch playlist...');
                    return;
                }

                User.findById(req.user._id, function(error, user){
                    if(error){
                        console.log('Could not fetch user...');
                        return;
                    }

                    user.rating.push(newRating);
                    user.save();

                    playlist.rating = playlist.rating + newRating;
                    playlist.totalRatings = playlist.totalRatings + 1;
                    playlist.save();

                    res.redirect('/api/playlists/' + playlistId);
                });
            });
        },
        addEditorToPlaylist: function(req, res) {
            var playlistId = req.params.id;
            var editor = req.body.editorUsername;

            User.findOne({username: editor}, function (error, user) {
                if (error) {
                    console.log('Could not fetch user...' + error);
                    return;
                }

                if (user) {
                    Playlist.findById(playlistId, function(error, playlist){
                        if(error){
                            return;
                        }

                        playlist.visibleTo.push(editor);
                        playlist.save();

                        res.redirect('/api/playlists/' + playlistId);
                    });

                    return;
                }

                res.redirect('/api/playlists/' + playlistId);
            });
        }
    };
};