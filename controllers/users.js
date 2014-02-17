// Simple example of a "users" controller
module.exports = {

  // Any initialization/startup stuff...
  init: function () {
    // On connect, just send a test payload
    this.sockets.users.on('connection', function(socket) {
      socket.emit('test', { data: 'This is a test' });
    });
  },

  // Define data tables/stores (and models) to access
  data: [ 'users' ],

  // Define any socket namespaces to use (no slash required)
  sockets: [ 'users' ],

  // Called by api/users "GET"
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

  // Called by api/users "POST"
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

  // Called by api/users "PUT"
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

  // Called by api/users "DELETE"
  deleteUser: function (req, res) {
    var self = this;
    self.data.users.remove({ '_id': req.params[0] }, function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  // Sends out validation errors
  sendValidationErr: function (res, failures) {
    res.send(400, { 'status': 'error', 'message': 'Failed validation on ' + failures.join() });
  },

  // Sends response to data query
  sendResponse: function (res, err, data) {
    if (err) {
      res.send(400, { 'status': 'error', 'message': err });
    } else {
      res.send(200, { 'status': 'success', 'message': data });
    }
  }
};