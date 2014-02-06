// Core configuration for DozeJS
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

  }

};

module.exports = config;