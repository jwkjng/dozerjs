// Define CORS policy middleware
var config = require('../config.js');
var cors = function *(next) {
  var req = this.request, res = this.response;
  res.set({
    'Access-Control-Allow-Origin': config.cors.origin,
    'Access-Control-Allow-Methods': config.cors.methods,
    'Access-Control-Allow-Headers': config.cors.headers
  });
  yield next;
};

module.exports = cors;
