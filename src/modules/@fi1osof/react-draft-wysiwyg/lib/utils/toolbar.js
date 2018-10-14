'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeRecursive = exports.getFirstIcon = undefined;

var _common = require('./common');

/**
* This function is used when displaying options in drop-down.
* Icon for first available options is used in drop-down placeholder.
*/
var getFirstIcon = function getFirstIcon(config) {
  return config[config.options[0]].icon;
};

/**
* The function is used to recursively merge toolbar options.
* It assumes all the options are peresent in obj1.
* It recursively merges objects but not arrays.
*/


var mergeRecursive = function mergeRecursive(obj1, obj2) {
  if (obj1 && obj2 === undefined) {
    return obj1;
  }
  var mergedValue = {};
  (0, _common.forEach)(obj1, function (key, value) {
    if ((0, _common.isMap)(value)) {
      mergedValue[key] = mergeRecursive(value, obj2[key]);
    } else {
      mergedValue[key] = obj2[key] !== undefined ? obj2[key] : value;
    }
  });
  return mergedValue;
};

exports.getFirstIcon = getFirstIcon;
exports.mergeRecursive = mergeRecursive;

// todo: writing test cases for these methods and new methods added in common.js