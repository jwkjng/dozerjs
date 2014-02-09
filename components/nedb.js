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
 * Returns the entire data set
 * @method all
 * @returns {object} all records
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
 * @returns {object|boolean} record(s) found or false
 */
db.prototype.find = function (field, query, limit, cb) {
  store.find({ field: query }).limit(limit).exec(cb);
};

/**
 * Returns all data in table
 * @method findOne
 * @returns {object|boolean} record in table or false
 */
db.prototype.findOne = function (field, query, cb) {
  this.find(field, query, 1, cb);
};

/**
 * Adds a new record to the table
 * @method insert
 * @param {object} data - Data to store
 * @returns {object} record created
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