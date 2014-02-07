var fs = require("fs");

// Manages the API endpoints
var api = {

  // Container for endpoint controllers
  endpoints: {},

  // Initializes the endpoints by loading them into the endpoints object
  init: function () {
    var self = this;
    fs.readdirSync('api').forEach(function (file) {
      if (file.split('.').pop() === 'js') {
        self.endpoints[file.replace('.js', '')] = require('../api/'+file);
        console.log("API Loaded: "+file);
      }
    });
  },

  // Processes call to endpoints
  process: function (req, res) {
    var endpoint = req.params.endpoint;
    var reqMethod = req.method;
    var supportedMethods = [];
    var method;
    // Ensures endpoint exists
    if (api.endpoints.hasOwnProperty(endpoint)) {
      // Build array of supported methods
      for (var method in endpoints[endpoint]) {
        supportedMethods.push(method);
      }
      // Ensure endpoint supports method
      if(supportedMethods.indexOf(reqMethod)) {

      } else {
        res.header
        res.send()
      }
    } else {
      res.send(404, { "status": "error", "message": "Endpoint does not exist" });
    }
  }

};

module.exports = api;