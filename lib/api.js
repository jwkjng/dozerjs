var modules = require('./modules');
var config = require('../config.js');

// Manages the API endpoints
var api = {

  // Processes call to endpoints
  process: function (req, res) {
    var endpoint = req.params.endpoint;
    var reqMethod = req.method;
    var supportedMethods = [];
    var method;
    var endpointMethod;
    var fn;
    var controller;
    var data = {};

    // Verify endpoint
    if (!modules.api.hasOwnProperty(endpoint)) {
      res.send(404, { 'status': 'error', 'message': 'Endpoint does not exist' });
      return;
    }

    // Build array of supported methods
    for (method in modules.api[endpoint]) {
      supportedMethods.push(method);
    }

    // Verify method supported
    if (supportedMethods.indexOf(reqMethod) === -1) {
      // Set allowed methods in header
      res.header('Access-Control-Allow-Methods', supportedMethods.join());
      // Send 405 - Method not allowed
      res.send(405, { 'status': 'error', 'message': 'Method not allowed' });
      return;
    }

    // Set endpointMethod
    endpointMethod = modules.api[endpoint][reqMethod];

    // Verify API specifies controller and fn
    if (!endpointMethod.hasOwnProperty('controller') || !endpointMethod.hasOwnProperty('fn')) {
      res.send(500, { 'status': 'error', 'message': 'API error - Not Specified Correctly' });
      return;
    }

    // Set fn
    fn = modules.api[endpoint][reqMethod].fn;

    // Verify controller exists
    if (!modules.controllers.hasOwnProperty(endpoint)) {
      res.send(500, { 'status': 'error', 'message': 'Controller error - Does Not Exist' });
      return;
    }

    // Set controller
    controller = modules.controllers[endpoint];

    // Verify controller endpoint method exists and is function
    if (!controller.hasOwnProperty(fn) && typeof controller[fn] !== 'function') {
      res.send(500, { 'status': 'error', 'message': 'Controller error - Method Incorrect or Does Not Exist' });
      return;
    }

    // Create data connection object
    if (controller.hasOwnProperty('data') && controller.data.length) {
      // Loops through controller data array and instantiates data connection
      for (var i = 0, z = controller.data.length; i<z; i++) {
        data[controller.data[i]] = new modules.components[config.db.adapter](controller.data[i], config.db.config);
      }
    }

    // Done here. Let the controller do it's thing
    controller[fn].call(this, req, res, data);

  }

};

module.exports = api;