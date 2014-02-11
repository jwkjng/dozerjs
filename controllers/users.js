// Get modules
var modules = require('../lib/modules.js');
// Setup db
var userTable = modules.lib.db('users');

// Simple example of a "users" controller
module.exports = {
  getUser: function (req, res) {
    res.send({ "GET": "User" });
  },

  createUser: function (req, res) {
    res.send({ "POST": "User" });
  },

  updateUser: function (req, res) {
    res.send({ "PUT": "User" });
  },

  deleteUser: function (req, res) {
    res.send({ "DELETE": "User" });
  }
};