// Simple example of a "users" controller
module.exports = {

  // Any initialization/startup stuff...
  init: function () {
    console.log('I AM ALIVE');
  },

  // Define data tables/stores (and models) to access
  data: [ 'users' ],

  getUser: function (req, res) {
    var self = this;
    if (req.params[0]) {
      // Get by id
      self.data.users.find({ '_id': req.params[0] }, function (err, data) {
        self.sendResponse(res, err, data);
      });
    } else {
      // Get list
      self.data.users.all(function (err, data) {
        self.sendResponse(res, err, data);
      });
    }
  },

  createUser: function (req, res) {
    var self = this;
    self.data.users.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.users.insert(req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  updateUser: function (req, res) {
    var self = this;
    self.data.users.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.users.update({ '_id': req.params[0] }, req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  deleteUser: function (req, res) {
    var self = this;
    self.data.users.remove({ '_id': req.params[0] }, function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  sendValidationErr: function (res, failures) {
    res.send(400, { 'status': 'error', 'message': 'Failed validation on ' + failures.join() });
  },

  sendResponse: function (res, err, data) {
    if (err) {
      res.send(400, { 'status': 'error', 'message': err });
    } else {
      res.send(200, { 'status': 'success', 'message': data });
    }
  }
};