var express = require('express');
var path = require('path');

module.exports = function(app) {
    app.set('view engine', 'jade');
    app.set('views', path.normalize(__dirname + '/..') + '/views');
};