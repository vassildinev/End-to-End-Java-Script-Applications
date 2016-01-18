var express = require('express'),
    env = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

var app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/routers')(app);


app.get('*', function(req, res) {
    res.render('shared/not-found', {});
});

app.listen(config.port);
console.log("Server running on port: " + config.port);