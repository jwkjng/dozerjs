// Handles processing of requests against the REST API
// Endpoints are determined by the contents of the /api directory

var modules = require('./modules');
var api = {

  // Processes call to endpoints
  // Called by index.js when a /api/* is requested
  process: function (req, res) {
    var endpoint = req.params.endpoint;
    var reqMethod = req.method;
    var reqPath = req.params[0];
    var supportedMethods = [];
    var supportedRoutes = {};
    var method;
    var endpointMethod;
    var fn;
    var controller;

    // Verify endpoint exists or return 404
    if (!modules.api.hasOwnProperty(endpoint)) {
      res.send(404, { 'status': 'error', 'message': 'Endpoint does not exist' });
      return;
    }

    // Build array of supported methods, this is used if the method does not
    // exists as HTTP 405's require return of Access-Control-Allow-Methods
    for (method in modules.api[endpoint]) {
      supportedMethods.push(method);
    }

    // Verify method supported or return 405 with supported methods
    if (supportedMethods.indexOf(reqMethod) === -1) {
      // Set allowed methods in header
      res.header('Access-Control-Allow-Methods', supportedMethods.join());
      // Send 405 - Method not allowed
      res.send(405, { 'status': 'error', 'message': 'Method not allowed' });
      return;
    }

    // Set endpointMethod variable
    endpointMethod = modules.api[endpoint][reqMethod]; // e.g. '/api/user/GET'

    // check for endpointMethod is array
    if(Object.prototype.toString.call(endpointMethod) === '[object Array]'){
        // put the available routes in an array to match against.
        for(var i = 0; i < endpointMethod.length; i++){
          console.log(endpointMethod[i]);
          supportedRoutes[endpointMethod[i].path] = endpointMethod[i];
        }

        // check to see if the path var is in the supportRoutes array
        /*if(supportedRoutes.hasOwnProperty(reqPath)){
          endpointMethod = supportedRoutes[reqPath];
        } else {
          endpointMethod = supportedRoutes['default'];
        }*/

        for (var route in supportedRoutes) {
          var matcher = reqPath.match(new RegExp(supportedRoutes[route].path.replace(/:[^\s/]+/g, "([\\w-]+)")));
          if (matcher !== null) {
            var params = [];
            // Get args
            if (matcher.length > 1) {
              for (i = 1, z = matcher.length; i < z; i++) {
                params.push(matcher[i]);
              }
            }
            console.log("Matched " + supportedRoutes[route].path + ' WITH: '+params);
          }
        }

    }

    // Verify API specifies controller and fn properties so the request can be
    // properly routed, or return a 500
    if (!endpointMethod.hasOwnProperty('controller') || !endpointMethod.hasOwnProperty('fn')) {
      res.send(500, { 'status': 'error', 'message': 'API error - Not Specified Correctly' });
      return;
    }

    // Set fn variable
    fn = endpointMethod.fn;

    // Verify the specified controller exists in modules or send 500
    if (!modules.controllers.hasOwnProperty(endpoint)) {
      res.send(500, { 'status': 'error', 'message': 'Controller error - Does Not Exist' });
      return;
    }

    // Set controller variable
    controller = modules.controllers[endpoint];

    // Verify controller endpoint method exists and is function or return 500
    if (!controller.hasOwnProperty(fn) && typeof controller[fn] !== 'function') {
      res.send(500, { 'status': 'error', 'message': 'Controller error - Method Incorrect or Does Not Exist' });
      return;
    }

    // Passed all checks, call controller method and pass req and res
    controller[fn](req, res);

  }

};

module.exports = api;