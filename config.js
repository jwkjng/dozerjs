// Core configuration for DozerJS
var config = {

  // Environment configuration
  env: {
    // Public root
    public_http: 'public/src',
    // Port to run over
    port: 8181
  },

  // Database store configuration
  db: {

    // Specify adapter to use
    adapter: 'nedb',

    // Adapter specific configuration
    config: {
      store: '/db'
    }

  },

  // Custom express middleware
  middleware: [
    'cors'
  ]

};

module.exports = config;