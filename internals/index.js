// This file kicks things off
// It initializes the api and web controllers and starts the static web service
var express = require('express');
var app = express();
var stdout = require('./stdout');
var slash = require('express-slash');
var multipart = require('connect-multiparty');
var multiparty = multipart();
var config = require('../config.js');
var adapters = require('./adapters.js');
var api = require('./api.js');
var web = require('./web.js');
var middleware = config.middleware;

// Initialize adapters
adapters.init();

// Initialize custom middleware
stdout('title','LOADING MIDDLEWARE');
for (var i=0, z=middleware.length; i<z; i++) {
  if (adapters.hasOwnProperty(middleware[i])) {
    app.use(adapters[middleware[i]]);
    stdout('output', 'MIDDLEWARE Applied: ' + middleware[i]);
  } else {
    stdout('error', 'ADAPTER Missing: ' + middleware[i]);
  }
}

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
stdout('title', 'SERVER RUNNING');
stdout('output', 'PORT: '+config.env.port);