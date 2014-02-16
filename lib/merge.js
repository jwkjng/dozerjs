// Used to merge objects, specifically when in production mode in which
// the production configuration must recursively take precedence over specific
// values for prod.
var mergeObjects = function (obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor === Object) {
        obj1[p] = mergeObjects(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }
  return obj1;
};

module.exports = mergeObjects;