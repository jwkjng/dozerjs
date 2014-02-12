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
};

nedb.prototype.count = function (field, query, cb) {
  this.store.count({ field: query }, cb);
};

nedb.prototype.all = function (cb) {
  this.store.find({}, cb);
};

nedb.prototype.find = function (field, query, limit, cb) {
  this.store.find({ field: query }).limit(limit).exec(cb);
};

nedb.prototype.findOne = function (field, query, cb) {
  this.find(field, query, 1, cb);
};

nedb.prototype.insert = function (data, cb) {
  store.insert(data, cb);
};

nedb.prototype.update = function (field, query, data, cb) {
  store.update({ field: query }, data, cb);
};

nedb.prototype.remove = function (field, query, cb) {
  store.remove({ field: query }, cb);
};



module.exports = nedb;