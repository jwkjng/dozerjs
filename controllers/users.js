// Simple example of a "users" controller
var users = {

  // Any initialization/startup stuff...
  init: function () {
    console.log('I AM ALIVE');
  },

  // Define data tables/stores (and models) to access
  data: [ 'users' ],

  getUser: function (req, res) {

    // Example data
    var exData = {
      '_id': '1u2j38dj36s',
      'username': 'testuser',
      'email': 'test@email.com',
      'password': '1jj1j2h77dhvdg2'
    };

    // Example of validation against model
    users.data.users.validate(exData, function (err, failures) {
      if (err) {
        res.send({ "Validation": "Errors: " + failures.join() });
      } else {
        res.send({ "Validation": "Passed" });
      }
    });

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

module.exports = users;