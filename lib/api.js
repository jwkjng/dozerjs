// Handles processing of requests against the REST API
// Endpoints are determined by the contents of the /api directory

var modules = require('./modules');
var api = {

  // Processes call to endpoints
  // Called by index.js when a /api/* is requested
  process: function *(next) {
    var req = this.request, res = this.response;
    var endpoint = this.params[0];
    var reqMethod = this.method;
    var reqPath = typeof this.params[1] === 'undefined' ? '': this.params[1].replace(/\//i, '');
    var supportedMethods = [];
    var supportedRoutes = {};
    var method;
    var endpointMethod;
    var fn;
    var controller;
    var matcher;
    var paramNames = [];
    var z;

    // Verify endpoint exists or return 404
    if (!modules.api.hasOwnProperty(endpoint)) {
      res.status = 404;
      res.statusString = 'Endpoint does not exist';
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
      res.set('Access-Control-Allow-Methods', supportedMethods.join());
      // Send 405 - Method not allowed
      res.status = 405;
      res.statusString = 'HTTP Method not allowed';
      return;
    }

    // Set endpointMethod variable
    endpointMethod = modules.api[endpoint][reqMethod]; // e.g. '/api/user/GET'

    // Check if endpointMethod is array (has multiple routes defined)
    if(Object.prototype.toString.call(endpointMethod) === '[object Array]'){
      // Put the available routes in an array to match against.
      for(var i = 0; i < endpointMethod.length; i++){
        //console.log(endpointMethod[i]);
        supportedRoutes[endpointMethod[i].path] = endpointMethod[i];
      }

      // Set endpoint method to false while matching
      endpointMethod = false;

      // Set paramNames
      var setNames = function (path) {
        paramNames = [];
        path.replace(/:(\w+)/g, function(_, match) {
          paramNames.push(match);
        });
      };

      // Loop through supported routes and test for params match
      for (var route in supportedRoutes) {
        matcher = reqPath.match(new RegExp(supportedRoutes[route].path.replace(/:[^\s/]+/g, '([\\w-]+)')));
        if (matcher !== null) {

          // Build array from param names
          setNames(supportedRoutes[route].path);

          // Set req.params object to key-values matched
          if (matcher.length > 1) {
            for (i = 1, z = matcher.length; i < z; i++) {
              this.params[paramNames[i-1]] = matcher[i];
            }
          }

          // Set endpoint method to matched route
          endpointMethod = supportedRoutes[route];
        }
      }

      // If the matcher found nada, use the default
      if (!endpointMethod) {
        endpointMethod = supportedRoutes['default'];
      }

    }

    // Verify API specifies controller and fn properties so the request can be
    // properly routed, or return a 500
    if (!endpointMethod.hasOwnProperty('controller') ||
        !endpointMethod.hasOwnProperty('fn')) {
      res.status = 500;
      res.statusString = 'API error - Not Specified Correctly';
      return;
    }

    // Set fn variable
    fn = endpointMethod.fn;

    // Verify the specified controller exists in modules or send 500
    if (!modules.controllers.hasOwnProperty(endpoint)) {
      res.status = 500;
      res.statusString = 'Controller error - Does Not Exist';
      return;
    }

    // Set controller variable
    controller = modules.controllers[endpoint];

    // Verify controller endpoint method exists and is function or return 500
    if (!controller.hasOwnProperty(fn) &&
        typeof controller[fn] !== 'function') {
      res.status = 500;
      res.statusString = 'Controller error - '
              + 'Method Incorrect or Does Not Exist';
      return;
    }

    // Passed all checks, call controller method and pass context
    controller[fn](this);

  }

};

module.exports = api;
