var Datastore = require('nedb');
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
};

nedb.prototype.count = function (field, query, cb) {
  this.store.count(query, cb);
};

nedb.prototype.all = function (cb) {
  this.store.find({}, cb);
};

nedb.prototype.find = function (query, cb) {
  this.store.find(query, cb);
};

nedb.prototype.insert = function (data, cb) {
  this.store.insert(data, cb);
};

nedb.prototype.update = function (query, data, cb) {
  this.store.update(query, data, cb);
};

nedb.prototype.remove = function (query, cb) {
  this.store.remove(query, cb);
};



module.exports = nedb;