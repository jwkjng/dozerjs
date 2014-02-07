// This file kicks things off
// It initializes the api and web controllers and starts the static web service
var express = require('express');
var app = express();
var config = require('../config.js');
var api = require('./api.js');
var web = require('./web.js');

// Initialize API
api.init();

// Process API calls
app.all('/api/:endpoint/*', api.process);

// Serve static assets
app.get('/*', web.serve);

// Startup
app.listen(config.env.port);