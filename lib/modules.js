var fs = require('fs');
var stdout = require('./stdout');

// Manages the loading of modules
var modules = {

  // Initializes the modules by loading them into the object
  load: function (type) {
    var self = this;
    var title = type.toUpperCase();
    var titleSingular = (title.substr(title.length - 1) === "S")
      ? title.substr(0, title.length - 1)
      : title;

    // Ensure an onject exists
    if (!self.hasOwnProperty(type)) {
      self[type] = {};
    }

    // Print out message
    stdout('title','LOADING '+title);

    // Loop through files
    fs.readdirSync(type).forEach(function (file) {
      if (file.split('.').pop() === 'js') {
        self[type][file.replace('.js', '')] = require('../'+type+'/'+file);
        stdout('output',titleSingular+' Loaded: '+file);
      }
    });
  }
};

module.exports = modules;