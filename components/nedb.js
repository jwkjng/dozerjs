var Datastore = require('nedb');
var store;
/**
 * DozerJS NeDB component
 * @constructor db
 * @param {string} table - The table to query
 * @param {object} config - DB config object
 */
var db = function (table, config) {
  this.table = table;
  this.config = config;
  store = new Datastore( '../' + config.db.store + '/' + table + '.db');
	store.loadDatabase();
};

/**
 * Returns number of records
 * @method count
 */
db.prototype.count = function (field, query, cb) {
  store.count({ field: query }, cb);
};

/**
 * Returns the entire data set
 * @method all
 */
db.prototype.all = function (cb) {
  store.find({}, cb);
};

/**
 * Searches data for specific entry
 * @method find
 * @param {string} field - Field to search
 * @param {string} query - String to search for
 * @param {number} limit - Max results
 */
db.prototype.find = function (field, query, limit, cb) {
  store.find({ field: query }).limit(limit).exec(cb);
};

/**
 * Returns single record in table
 * @method findOne
 * @param {string} field - Field to search
 * @param {string} query - String to search for
 */
db.prototype.findOne = function (field, query, cb) {
  this.find(field, query, 1, cb);
};

/**
 * Adds a new record to the table
 * @method insert
 * @param {object} data - Data to store
 */
db.prototype.insert = function (data, cb) {
  store.insert(data, cb);
};

/**
 * Updates a matching record
 * @method update
 * @param {string} field - Field to match
 * @param {string} query - Data to match
 * @param {object} data - Data to replace
 */
db.prototype.update = function (field, query, data, cb) {
  store.update({ field: query }, data, cb);
};

/**
 * Removes a record or records from the table/store
 * @method remove
 * @param {string} field - Field to match
 * @param {string} query - Data to match
 */
db.prototype.remove = function (field, query, cb) {
  store.remove({ field: query }, cb);
};