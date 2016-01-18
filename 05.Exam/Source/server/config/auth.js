var passport = require('passport'),
    Playlist = require('mongoose').model('Playlist');

module.exports = {
    login: function(req, res) {
        var auth = passport.authenticate('local', function(err, user) {
            var errorsMessage = '';

            if(err) {
                errorsMessage += 'Could not fetch user';
            }

            if (!user) {
                errorsMessage += 'Incorrect login data';
            }

            if(errorsMessage.length > 0){
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

                        res.render('home', {
                            loginErrors: errorsMessage,
                            playlists: playlistsCopy
                        });
                    });
            } else {
                req.logIn(user, function (err) {
                    if (err) return next(err);
                    res.redirect('/home');
                });

                res.end();
            }
        });

        auth(req, res);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/home');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.redirect('/unauthorized');
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(role) {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.redirect('/unauthorized');
                res.end();
            }
        }
    }
};