'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.forEach = forEach;
exports.hasProperty = hasProperty;
exports.isEmptyString = isEmptyString;
exports.isMap = isMap;
exports.filter = filter;
exports.stopPropagation = stopPropagation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Utility function to execute callback for eack key->value pair.
*/
function forEach(obj, callback) {
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

function hasProperty(obj, property) {
  var result = false;
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
    }
  }
  return result;
}

/**
* The function returns true if the string passed to it has no content.
*/
function isEmptyString(str) {
  return !str || !str.trim();
}

/**
* The function will return true for simple javascript object,
* which is not any other built in type like Array.
*/
function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
* The function will return filter out props fron and return new props.
*/
function filter(obj, keys) {
  var filteredKeys = (0, _keys2.default)(obj).filter(function (key) {
    return keys.indexOf(key) < 0;
  });
  var filteredObject = {};
  if (filteredKeys && filteredKeys.length > 0) {
    filteredKeys.forEach(function (key) {
      filteredObject[key] = obj[key];
    });
  }
  return filteredObject;
}

function stopPropagation(event) {
  event.stopPropagation();
}