var modules = require('./modules.js');
var config = require('../config.js');

var db = function (table) {

  // Get adapter
  return new modules.components[config.db.adapter](table, config.db.config);

};

module.exports = db;