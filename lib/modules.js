var fs = require('fs');
var stdout = require('./stdout');

// Manages the loading of modules
var modules = {

  // Initializes the modules by loading them into the object
  load: function (type) {
    var self = this;
    var title = type.toUpperCase();
    if (!self.hasOwnProperty(type)) {
      self[type] = {};
    }
    stdout('title','LOADING '+title);
    fs.readdirSync(type).forEach(function (file) {
      if (file.split('.').pop() === 'js') {
        self[type][file.replace('.js', '')] = require('../'+type+'/'+file);
        stdout('output',title+' Loaded: '+file);
      }
    });
  }
};

module.exports = modules;