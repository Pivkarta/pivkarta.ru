'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = function (_Component) {
  (0, _inherits3.default)(Option, _Component);

  function Option() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Option);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Option.__proto__ || (0, _getPrototypeOf2.default)(Option)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          value = _this$props.value;

      if (!disabled) {
        onClick(value);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Option, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          activeClassName = _props.activeClassName,
          active = _props.active,
          disabled = _props.disabled,
          title = _props.title;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-option-wrapper', className, (_classNames = {}, (0, _defineProperty3.default)(_classNames, 'rdw-option-active ' + activeClassName, active), (0, _defineProperty3.default)(_classNames, 'rdw-option-disabled', disabled), _classNames)),
          onClick: this.onClick,
          'aria-selected': active,
          title: title
        },
        children
      );
    }
  }]);
  return Option;
}(_react.Component);

exports.default = Option;
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.any,
  value: _propTypes2.default.string,
  className: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  title: _propTypes2.default.string
} : {};
module.exports = exports['default'];