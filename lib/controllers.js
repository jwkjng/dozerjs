// Initializes controllers
var modules = require('./modules');
var config = require('../config.js');
var data;
var controller;

// This funcition loops through all of the controllers loaded by the modules.load
// in index.js.
//
// It checks first to ensure a connection property `data` exists and has elements
// then loops through each of those and reassigns the controller's data attribute
// with an object containing connections to the data source, model, adapter, and
// validation objects so they are available to the controller
//
// Lastly it checks for a controller `init` method and if present, calls the
// function

var controllers = function () {
  modules.lib.stdout('title', 'INITIALIZING CONTROLLERS');
  for (var ctrl in modules.controllers) {
    controller = modules.controllers[ctrl];

    // Create data connection object
    if (controller.hasOwnProperty('data') && controller.data.length) {
      data = {};

      // Loops through controller data array and instantiates data connection
      for (var i = 0, z = controller.data.length; i<z; i++) {
        data[controller.data[i]] = new modules.adapters[config.db.adapter](controller.data[i], config.db.config);

        // Add model
        if (modules.models.hasOwnProperty(controller.data[i])) {
          modules.lib.stdout('output', ctrl + ' initialized');

          // Associate model with data source
          data[controller.data[i]].model = modules.models[controller.data[i]];
          // Add validation method to data (since there is a model)
          if (modules.lib.hasOwnProperty('validation')) {
            data[controller.data[i]].validate = modules.lib.validation;
          }

        // No data source(s) specified...
        } else {

          modules.lib.stdout('error', ctrl + ' is missing a data source');

        }
      }

      // Replace data with compiled object
      controller.data = data;

      // Check for, then call any init functions
      if(controller.hasOwnProperty('init')) {
        controller.init();
      }
    }
  }
};

module.exports = controllers;