// Core configuration for DozerJS
var config = {

  // Environment configuration
  env: {
    // Public root
    publicHTTP: 'public/src',
    // Port to run over
    port: 8181
  },

  // Database store configuration
  db: {

    // Specify adapter to use
    adapter: 'nedb',

    // Adapter specific configuration
    config: {
      store: 'data'
    }

  },

  // Custom express middleware
  middleware: [
    'cors'
  ]

};

module.exports = config;