var fs = require('fs');
var stdout = require('./stdout');

// Manages the API endpoints
var adapters = {

  // Initializes the adapters by loading them into the object
  init: function () {
    var self = this;
    stdout('title','LOADING ADAPTERS');
    fs.readdirSync('adapters').forEach(function (file) {
      if (file.split('.').pop() === 'js') {
        self[file.replace('.js', '')] = require('../adapters/'+file);
        stdout('output','ADAPTER Loaded: '+file);
      }
    });
  }
};

module.exports = adapters;