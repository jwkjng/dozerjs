var env = {};
var db = {};

/**
 * Environment configuration
 */
env.public = "/_public/src";
env.port = 8181;

/**
 * Database/store configuration
 */
db.adapter = "nedb";

// DB config settings, specific to adapter
db.config.store = "/db";