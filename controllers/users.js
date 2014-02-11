// Simple example of a "users" controller
module.exports = {

  // Define data tables/stores to access
  data: [ 'users' ],

  getUser: function (req, res, data) {
    console.log(data);
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