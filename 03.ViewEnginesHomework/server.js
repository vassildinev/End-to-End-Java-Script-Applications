var express = require('express');

var app = express();
require('./config/routes-config')(app);
require('./config/express-config')(app);

app.listen(3030);
console.log("Server running on port: " + 3030);