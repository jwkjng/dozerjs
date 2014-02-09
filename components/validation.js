// Validation for data models
var validation = function (data, model) {

  function processNode(parent,key,value) {
        if (parent !== "") {
            console.log(parent + " >> " + key + ": "+value);
        } else {
            console.log(key + ": " + value);
        }
    }

    function traverseNodes(parent, obj, fn) {
        for (var i in obj) {
            fn.apply(this,[parent, i,obj[i]]);
            if (obj[i] !== null && typeof(obj[i])==='object' && Object.prototype.toString.call( obj[i] ) !== '[object Array]') {
                traverseNodes(parent + " >> " + i,obj[i],fn);
            }
        }
    }

    traverseNodes("root", data, processNode);

};

module.exports = validation;