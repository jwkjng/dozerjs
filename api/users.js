// Simple example of a "users" api endpoint
module.exports = {

  // Handle GET method
  'GET': [
    {
      path: 'index',
      controller: 'users',
      fn: 'getUser'
    },
    {
      path: 'login',
      controller: 'users',
      fn: 'loginUser'
    },
    {
      path: 'account/:user/billing/edit',
      controller: 'users',
      fn: 'editBilling'
    }
  ],

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