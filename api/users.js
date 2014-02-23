// Simple example of a "users" api endpoint
module.exports = {

  // Handle GET method
  'GET': [
    {
        path: 'default',
        controller: 'users',
        fn: 'getUser'
    },
    {
        path: 'login/:id/:username',
        controller: 'users',
        fn: 'loginUser'
    },
    {
      path: 'test/route',
      controller: 'users',
      fn: 'getUser'
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