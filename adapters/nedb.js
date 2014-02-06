/**
 * Doze NeDB Adapter
 * @constructor db
 * @param {object} config - DB config object
 */
var db = function (config) {
  this.config = config;
};

/**
 * Searches data for specific entry
 * @method find
 * @param {string} field - Field to search
 * @param {string} query - String to search for
 * @param {number} limit - Max results
 * @returns {object|boolean} record(s) found or false
 */
db.prototype.find = function (field, query, limit) {

};

/**
 * Returns all data in table
 * @method findOne
 * @returns {object|boolean} record in table or false
 */
db.prototype.findOne = function (field, query) {
  return this.find(field, query, 1);
};

/**
 * Adds a new record to the table
 * @method insert
 * @param {object} data - Data to store
 * @returns {object} record created
 */
db.prototype.insert = function (data) {

};

/**
 * Updates a matching record
 * @method update
 * @param {string} field - Field to match
 * @param {string} query - Data to match
 * @param {object} data - Data to replace
 */
db.prototype.update = function (field, query, data) {

};

/**
 * Removes a record or records from the table/store
 * @method remove
 * @param {string} field - Field to match
 * @param {string} query - Data to match
 */
db.prototype.remove = function (field, query) {

};