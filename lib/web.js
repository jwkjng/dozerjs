var config = require('../config.js');

// Provides static serving of public files
var web = {

  // Serve up the statics!
  serve: function (req, res) {
    var path = req.params[0] ? req.params[0] : 'index.html';
    res.sendfile(path, {
      root: config.env.publicHTTP
    });
  }
};

module.exports = web;