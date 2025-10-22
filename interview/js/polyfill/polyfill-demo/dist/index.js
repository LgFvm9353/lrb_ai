"use strict";

require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
var arr = Array.from({
  length: 3
}, function (_, i) {
  return i;
});
console.log(arr);
if (arr.includes(1)) {
  console.log('includes 1');
}
var p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('success');
  }, 1000);
});
p.then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.log(err);
});