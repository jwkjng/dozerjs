// Initializes controllers
var modules = require('./modules');
var config = require('../config.js');
var data;
var controllers = function () {
  modules.lib.stdout('title', 'INITIALIZING CONTROLLERS');
  for (var ctrl in modules.controllers) {
    var controller = modules.controllers[ctrl];
    // Create data connection object
    if (controller.hasOwnProperty('data') && controller.data.length) {
      data = {};
      // Loops through controller data array and instantiates data connection
      for (var i = 0, z = controller.data.length; i<z; i++) {
        data[controller.data[i]] = new modules.components[config.db.adapter](controller.data[i], config.db.config);
        // Add model
        if (modules.models.hasOwnProperty(controller.data[i])) {
          modules.lib.stdout('output', ctrl + ' initialized');
          // Associate model with data source
          data[controller.data[i]].model = modules.models[controller.data[i]];
          // Add validation method to data (since there is a model)
          if (modules.lib.hasOwnProperty('validation')) {
            data[controller.data[i]].validate = modules.lib.validation;
          }
        } else {
          modules.lib.stdout('error', ctrl + ' is missing a data source');
        }
      }
      // Replace data with compiled object
      controller.data = data;

      // Call any init functions
      if(controller.hasOwnProperty('init')) {
        controller.init();
      }
    }
  }
};

module.exports = controllers;