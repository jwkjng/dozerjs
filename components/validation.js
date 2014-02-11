// Validation for data models

// Example:
// ----------------------------------------------------
// validation (data, model, function (err, failures) {
//    if (err) {
//      console.log(failures) // Array of failing nodes
//    } else {
//      // ... do something ...
//    }
// });

// Mocking in http://jsfiddle.net/xbX3c/13/
var validation = function (data, model, cb) {

  var failures = [];
  var regEx;
  var validJSON;
  var processNode;
  var result;
  var traverseNodes;

  regEx = {
    alphanum: /^[a-zA-Z0-9]+$/,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    phone: /^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$/,
    ssn: /^([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})+$/
  };

  validJSON = function (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  };

  processNode = function (key, value, valid) {
    result;
    switch (valid) {
      case 'string':
        result = (typeof value === "string") ? true : false;
        break;
      case 'number':
        result = (typeof value === "number") ? true : false;
        break;
      case 'boolean':
        result = (typeof value === "boolean" || value === "true" || value === "false") ? true : false;
        break;
      case 'array':
        result = (Object.prototype.toString.call( value ) === '[object Array]') ? true : false;
        break;
      case 'json':
        result = validJSON(value);
        break;
      default:
        result = (regEx.hasOwnProperty(valid)) ? regEx[valid].test(value) : false;
    }
    return result;
  };

  traverseNodes = function (obj, model, fn) {
    for (var i in obj) {
      if (model.hasOwnProperty(i)) {
        if (obj[i] !== null && typeof(obj[i])==='object' && Object.prototype.toString.call( obj[i] ) !== '[object Array]') {
          traverseNodes(obj[i],model[i],fn);
        } else {
          if(!fn(i,obj[i],model[i])) {
            failures.push(i);
          }
        }
      } else {
        failures.push(i);
      }
    }
  };

  traverseNodes(data, model, processNode);
  if (failures.length) {
    cb(true, failures);
  } else {
    cb(null);
  }

};

module.exports = validation;