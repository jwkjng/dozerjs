// Socket.io component
var io = require('socket.io');
var socketio = function (socket) {
  this.io = io;
  this.socket = socket;
};

module.exports = socketio;