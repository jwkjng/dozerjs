var fs = require("fs");

// Manages the API endpoints
var adapters = {

  // Initializes the adapters by loading them into the object
  init: function () {
    var self = this;
    fs.readdirSync('adapters').forEach(function (file) {
      if (file.split('.').pop() === 'js') {
        self[file.replace('.js', '')] = require('../adapters/'+file);
        console.log("ADAPTER Loaded: "+file);
      }
    });
  }
};

module.exports = adapters;