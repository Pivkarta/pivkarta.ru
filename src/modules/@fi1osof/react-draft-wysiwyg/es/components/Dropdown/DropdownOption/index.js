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

var DropDownOption = function (_Component) {
  (0, _inherits3.default)(DropDownOption, _Component);

  function DropDownOption() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DropDownOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDownOption.__proto__ || (0, _getPrototypeOf2.default)(DropDownOption)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onClick = _this$props.onClick,
          value = _this$props.value,
          disabled = _this$props.disabled;

      if (!disabled) {
        if (onSelect) {
          onSelect(value);
        }
        if (onClick) {
          event.stopPropagation();
          onClick(value);
        }
      }
    }, _this.setHighlighted = function () {
      var _this$props2 = _this.props,
          setHighlighted = _this$props2.setHighlighted,
          index = _this$props2.index;

      setHighlighted(index);
    }, _this.resetHighlighted = function () {
      var setHighlighted = _this.props.setHighlighted;

      setHighlighted(-1);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DropDownOption, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          active = _props.active,
          disabled = _props.disabled,
          highlighted = _props.highlighted,
          className = _props.className,
          activeClassName = _props.activeClassName,
          disabledClassName = _props.disabledClassName,
          highlightedClassName = _props.highlightedClassName,
          title = _props.title;

      return _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)('rdw-dropdownoption-default', className, (_classNames = {}, (0, _defineProperty3.default)(_classNames, 'rdw-dropdownoption-active ' + activeClassName, active), (0, _defineProperty3.default)(_classNames, 'rdw-dropdownoption-highlighted ' + highlightedClassName, highlighted), (0, _defineProperty3.default)(_classNames, 'rdw-dropdownoption-disabled ' + disabledClassName, disabled), _classNames)),
          onMouseEnter: this.setHighlighted,
          onMouseLeave: this.resetHighlighted,
          onClick: this.onClick,
          title: title
        },
        children
      );
    }
  }]);
  return DropDownOption;
}(_react.Component);
// todo: review classname use above.


exports.default = DropDownOption;
DropDownOption.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.any,
  value: _propTypes2.default.any,
  onClick: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  setHighlighted: _propTypes2.default.func,
  index: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  highlighted: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  highlightedClassName: _propTypes2.default.string,
  title: _propTypes2.default.string
} : {};