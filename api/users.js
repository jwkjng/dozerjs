// Simple example of a "users" api endpoint
module.exports = {

  // Handle GET method
  'GET': {
    controller: 'users',
    fn: 'getUser'
  },

  // Handle POST method
  'POST': {
    controller: 'users',
    fn: 'createUser'
  },

  // Handle PUT method
  'PUT': {
    controller: 'users',
    fn: 'updateUser'
  },

  // Handle DELETE method
  'DELETE': {
    controller: 'users',
    fn: 'deleteUser'
  }
};