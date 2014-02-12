// This file kicks things off
// It initializes the api and web controllers and starts the static web service
var express = require('express');
var app = express();
var slash = require('express-slash');
var multipart = require('connect-multiparty');
var multiparty = multipart();
var config = require('./config.js');
var modules = require('./lib/modules.js');
var middleware = config.middleware;

// Load libs
modules.load('lib');

// Load adapters
modules.load('adapters');

// Load components
modules.load('components');

// Load controllers
modules.load('controllers');

// Load models
modules.load('models');

// Load API endpoints
modules.load('api');

// Initialize custom middleware
if (middleware.length) {
  modules.lib.stdout('title','LOADING MIDDLEWARE');
  for (var i=0, z=middleware.length; i<z; i++) {
    if (modules.components.hasOwnProperty(middleware[i])) {
      app.use(modules.components[middleware[i]]);
      modules.lib.stdout('output', 'MIDDLEWARE Applied: ' + middleware[i]);
    } else {
      modules.lib.stdout('error', 'ADAPTER Missing: ' + middleware[i]);
    }
  }
}

// Set CORS policies
app.use(modules.lib.cors);

// Basic express config
app.enable('strict routing');
app.use(express.logger(config.expressLogging));
app.use(express.cookieParser());
app.use(express.session({ secret: config.secret }));
app.use(app.router);
app.use(slash());
app.use(express.json());
app.use(express.urlencoded());

// Initialize controllers
modules.lib.controllers();

// Process API calls
app.all('/api/:endpoint*', multiparty, modules.lib.api.process);

// Serve static assets
app.get('/*', modules.lib.web.serve);

// Startup
app.listen(config.env.port);
modules.lib.stdout('title', 'SERVER RUNNING');
modules.lib.stdout('output', 'PORT: '+config.env.port);