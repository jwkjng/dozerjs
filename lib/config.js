var fs = require('fs'),
	merge = require('./merge'),
	_ = require('underscore-contrib');

/**
 * @class Config
 */
var Config = function() {
	this.init.apply(this, _.toArray(arguments));
	return {
		'get': this.get.bind(this),
		'set': this.set.bind(this)
	};
};

_.extend(Config.prototype, {

	'init': function() {
		this.loadConfig();
	},

	'config': null,

	'getEnv': function() {
		if (process.env.NODE_ENV === 'production') {
			return 'production';
		} else {
			return 'dev';
		}
	},

	'loadConfig': function() {
		var config, prodConfig;
		config = require(__dirname + '/../config.js');
		if (this.getEnv() === 'production') {
			prodConfig = require(__dirname + '/../config.prod.js');
			config = merge(config, prodConfig);
		}
		this.config = config;
	},

	'get': function(key) {
		var result;
		if (!key) {
			return _.snapshot(this.config);
		}
		result = _.getPath(this.config, key);
		if (!_.isObject(result) || _.isArray(result)) {
			return result;
		}
		return _.snapshot(result);
	},

	'set': function(key, value) {
		var ks;
		if (!key) {
			throw 'No key specified.';
		}
		ks = key.split('.');
		this.config = _.setPath(this.config, value, ks);
	}

});

module.exports = new Config();
