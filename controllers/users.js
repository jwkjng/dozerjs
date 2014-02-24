// Simple example of a "users" controller
module.exports = {

  // Any initialization/startup stuff...
  init: function () {
  },

  // Define data tables/stores (and models) to access
  data: [ 'users' ],

  // Called by api/users "GET"
  getUser: function (req, res) {
    res.send("getUser");
  },

  loginUser: function (req, res) {
    res.send("loginUser: "+req.params.id+", "+req.params.username);
  },

  // Called by api/users "POST"
  createUser: function (req, res) {
    res.send("createUser");
  },

  // Called by api/users "PUT"
  updateUser: function (req, res) {
    res.send("updateUser");
  },

  // Called by api/users "DELETE"
  deleteUser: function (req, res) {
    res.send("deleteUser");
  }
};