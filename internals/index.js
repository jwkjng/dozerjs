// This file kicks things off
// It initializes the api and web controllers and starts the static web service
var express = require('express');
var app = express();
var slash = require('express-slash');
var multipart = require('connect-multiparty');
var multiparty = multipart();
var config = require('../config.js');
var api = require('./api.js');
var web = require('./web.js');

// Basic express config
app.enable('strict routing');
app.use(app.router);
app.use(slash());
app.use(express.json());
app.use(express.urlencoded());

// Initialize API
api.init();

// Process API calls
app.all('/api/:endpoint*', multiparty, api.process);

// Serve static assets
app.get('/*', web.serve);

// Startup
app.listen(config.env.port);