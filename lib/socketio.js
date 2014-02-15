// Socket.io component
var io = require('socket.io');
var socketio = function (socket) {
  this.io = io;
  this.socket = socket;
};

socketio.prototype.getNamespace = function (namespace) {
  return this.io.of('/'+namespace);
};

module.exports = socketio;