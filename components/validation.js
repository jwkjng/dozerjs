// Validation for data models
var validation = function (data, model) {

    function processNode(key, value, valid) {
        console.log(key + ": " + value + ", should be a " + valid);
        var result;
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
        }
        console.log("Typeof is "+typeof value);
        console.log("Result is "+result);
        return result;
    }

    function traverseNodes(obj, model, fn) {
        for (var i in obj) {
            if (model.hasOwnProperty(i)) {
                if (obj[i] !== null && typeof(obj[i])==='object' && Object.prototype.toString.call( obj[i] ) !== '[object Array]') {
                    traverseNodes(obj[i],model[i],fn);
                } else {
                    if(!fn(i,obj[i],model[i])) {
                        console.log("Invalid value for "+i);
                        return false;
                    }
                }
            } else {
                console.log("Unmapped property property "+i);
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