"use strict";

module.exports = function(){
    return {
        loadHomePage: function(req, res){
              var user = req.user;
              res.render('home', {user: user});
              res.end();
        },

        loadNotFoundPage: function(req, res){
            var user = req.user;
            res.render('shared/not-found', {user: user});
            res.end();
        },


        loadUnauthorizedPage: function(req, res){
            res.render('shared/unauthorized', {});
            res.end();
        }
    };
};