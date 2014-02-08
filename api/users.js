// Simple example of a "users" api endpoint
module.exports.users = {

  // Handle GET method
  'get': {
    controller: 'users',
    method: 'get'
  },

  // Handle POST method
  'post': {
    controller: 'users',
    method: 'create'
  },

  // Handle PUT method
  'put': {
    controller: 'users',
    method: 'update'
  },

  // Handle DELETE method
  'delete': {
    controller: 'users',
    method: 'delete'
  }
};