// Simple example of a "users" controller
module.exports = {

  // Any initialization/startup stuff...
  init: function () {
    console.log('I AM ALIVE');
  },

  // Define data tables/stores (and models) to access
  data: [ 'users' ],

  getUser: function (req, res) {

    console.log(this.data.users);

    // Example data
    var exData = {
      '_id': '1u2j38dj36s',
      'username': 'testuser',
      'email': 'test@email.com',
      'password': '1jj1j2h77dhvdg2'
    };

    // Example of validation against model
    this.data.users.validate(exData, function (err, failures) {
      if (err) {
        res.send({ "Validation": "Errors: " + failures.join() });
      } else {
        res.send({ "Validation": "Passed" });
      }
    });

  },

  createUser: function (req, res) {
    var self = this;
    self.data.users.validate(req.body, function (err, failures) {
      if (err) {
        res.send({ 'status': 'error', 'message': 'failed validation on ' + failures.join });
      } else {
        self.data.users.insert(req.body, function (err, data) {
          if (err) {
            res.send({ 'status': 'error', 'message': err });
          } else {
            res.send({ 'status': 'success', 'message': data });
          }
        });
      }
    });
    //res.send({ "POST": "User" });
  },

  updateUser: function (req, res) {
    res.send({ "PUT": "User" });
  },

  deleteUser: function (req, res) {
    res.send({ "DELETE": "User" });
  }
};