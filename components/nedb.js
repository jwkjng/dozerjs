var Datastore = require('nedb');
var store;
/**
 * DozerJS NeDB component
 * @constructor db
 * @param {string} table - The table to query
 * @param {object} config - DB config object
 */
var nedb = function (table, config) {
  this.table = table;
  this.config = config;
  this.store = new Datastore(config.store + '/' + table + '.db');
	this.store.loadDatabase();

	this.count = function (field, query, cb) {
    this.store.count({ field: query }, cb);
  };

  this.all = function (cb) {
    this.store.find({}, cb);
  };

  this.find = function (field, query, limit, cb) {
    this.store.find({ field: query }).limit(limit).exec(cb);
  };

  this.findOne = function (field, query, cb) {
    this.find(field, query, 1, cb);
  };

  this.insert = function (data, cb) {
    store.insert(data, cb);
  };

  this.update = function (field, query, data, cb) {
    store.update({ field: query }, data, cb);
  };

  this.remove = function (field, query, cb) {
    store.remove({ field: query }, cb);
  };

};

module.exports = nedb;