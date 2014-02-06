var express = require('express');
var app = express();
var config = require('../config.js');
var api = require('./api.js');
var web = require('./web.js');

// Process API calls
app.all('/api/*', api.process);

// Serve static assets
app.get('/*', web.serve);

// Startup
app.listen(config.env.port);