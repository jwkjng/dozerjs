var fs = require('fs');
var stdout = require('./stdout');

// Manages the loading of modules
var modules = {

  // Initializes the modules by loading them into the object
  load: function (type) {
    var self = this;
    var title = type.toUpperCase();
    var titleSingular = title;
    var dir = (type==='lib') ? './' : '../'+type+'/';
    var scan = (type==='lib') ? __dirname : type;

    // Set title singular for stdout
    if (title.substr(title.length - 1) === 'S') {
      titleSingular = title.substr(0, title.length - 1);
    }

    // Ensure an onject exists
    if (!self.hasOwnProperty(type)) {
      self[type] = {};
    }

    // Print out message
    stdout('title','LOADING '+title);

    // Loop through files
    fs.readdirSync(scan).forEach(function (file) {
      if (file !== 'modules.js') {
        if (file.split('.').pop() === 'js') {
          self[type][file.replace('.js', '')] = require(dir+file);
          stdout('output',titleSingular+' Loaded: '+file);
        }
      }
    });
  }
};

module.exports = modules;