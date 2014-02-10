// Validation for data models
var validation = function (data, model) {

  function processNode(key,value,valid) {
      console.log(key + ": " + value + ": " + valid)
  }

  function traverseNodes(obj, model, fn) {
      for (var i in obj) {
          if (model.hasOwnProperty(i)) {
              if (obj[i] !== null && typeof(obj[i])==='object' && Object.prototype.toString.call( obj[i] ) !== '[object Array]') {
                  traverseNodes(obj[i],model[i],fn);
              } else {
                  fn.apply(this,[i,obj[i],model[i]]);
              }
          } else {
              console.log("Invalid property");
              return false;
          }
      }
      return true;
  }

  if(traverseNodes(data, model, processNode)) {
      console.log("DONE");
  } else {
      console.log("FAILED");
  }

};

module.exports = validation;