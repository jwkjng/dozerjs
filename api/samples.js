module.exports = {
  'GET': [
    {
      path: 'default',
      controller: 'samples',
      fn: 'getSamples'
    },
    {
      path: ':id',
      controller: 'samples',
      fn: 'getSample'
    },
    {
      path: ':id/:filter',
      controller: 'samples',
      fn: 'getSampleWithFilter'
    }
  ]
};
