// Simple example of a "users" api endpoint
module.exports.users = {

  // Handle GET method
  'get': {
    controller: 'users',
    method: 'getUser'
  },

  // Handle POST method
  'post': {
    controller: 'users',
    method: 'createUser'
  },

  // Handle PUT method
  'put': {
    controller: 'users',
    method: 'updateUser'
  },

  // Handle DELETE method
  'delete': {
    controller: 'users',
    method: 'deleteUser'
  }
};