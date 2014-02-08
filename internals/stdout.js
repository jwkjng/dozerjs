// Outputs content to terminal
var stdout = function (type, message) {
  switch(type) {
    case 'title':
      console.log('\n' + message);
      console.log('---------------------------------');
      break;
    case 'output':
      console.log('>> ' + message);
      break;
    case 'error':
      console.log('!! ' + message);
      break;
  }
};

module.exports = stdout;