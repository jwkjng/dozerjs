// Validation for data models

// Mocking in http://jsfiddle.net/xbX3c/10/
var validation = function (data, model) {

    var regEx = {
        alphanum: /^[a-zA-Z0-9]+$/,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        phone: /^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$/,
        ssn: /^([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})+$/
    };

    var validJSON = function (value) {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    };

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
            case 'json':
                result = validJSON(value);
                break;
            default:
                result = (regEx.hasOwnProperty(valid)) ? regEx[valid].test(value) : false;
        }
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