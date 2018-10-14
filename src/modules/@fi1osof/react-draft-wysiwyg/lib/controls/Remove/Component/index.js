'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RemoveComponent = function RemoveComponent(_ref) {
  var config = _ref.config,
      onChange = _ref.onChange,
      translations = _ref.translations;
  var icon = config.icon,
      className = config.className,
      title = config.title;

  return _react2.default.createElement(
    'div',
    { className: 'rdw-remove-wrapper', 'aria-label': 'rdw-remove-control' },
    _react2.default.createElement(
      _Option2.default,
      {
        className: (0, _classnames2.default)(className),
        onClick: onChange,
        title: title || translations['components.controls.remove.remove']
      },
      _react2.default.createElement('img', {
        src: icon,
        alt: ''
      })
    )
  );
};

RemoveComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};

exports.default = RemoveComponent;
module.exports = exports['default'];