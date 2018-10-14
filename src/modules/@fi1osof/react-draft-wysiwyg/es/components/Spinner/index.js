'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: 'rdw-spinner' },
    _react2.default.createElement('div', { className: 'rdw-bounce1' }),
    _react2.default.createElement('div', { className: 'rdw-bounce2' }),
    _react2.default.createElement('div', { className: 'rdw-bounce3' })
  );
};