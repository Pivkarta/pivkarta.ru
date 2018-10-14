'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _common = require('../../../utils/common');

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutComponent = function (_Component) {
  (0, _inherits3.default)(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayoutComponent.__proto__ || (0, _getPrototypeOf2.default)(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyle: 'color'
    }, _this.onChange = function (color) {
      var onChange = _this.props.onChange;
      var currentStyle = _this.state.currentStyle;

      onChange(currentStyle, color);
    }, _this.setCurrentStyleColor = function () {
      _this.setState({
        currentStyle: 'color'
      });
    }, _this.setCurrentStyleBgcolor = function () {
      _this.setState({
        currentStyle: 'bgcolor'
      });
    }, _this.renderModal = function () {
      var _this$props = _this.props,
          _this$props$config = _this$props.config,
          popupClassName = _this$props$config.popupClassName,
          colors = _this$props$config.colors,
          _this$props$currentSt = _this$props.currentState,
          color = _this$props$currentSt.color,
          bgColor = _this$props$currentSt.bgColor,
          translations = _this$props.translations;
      var currentStyle = _this.state.currentStyle;

      var currentSelectedColor = currentStyle === 'color' ? color : bgColor;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-colorpicker-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-header' },
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' }),
              onClick: _this.setCurrentStyleColor
            },
            translations['components.controls.colorpicker.text']
          ),
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }),
              onClick: _this.setCurrentStyleBgcolor
            },
            translations['components.controls.colorpicker.background']
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-options' },
          colors.map(function (c, index) {
            return _react2.default.createElement(
              _Option2.default,
              {
                value: c,
                key: index,
                className: 'rdw-colorpicker-option',
                activeClassName: 'rdw-colorpicker-option-active',
                active: currentSelectedColor === c,
                onClick: _this.onChange
              },
              _react2.default.createElement('span', {
                style: { backgroundColor: c },
                className: 'rdw-colorpicker-cube'
              })
            );
          })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (!this.props.expanded && props.expanded) {
        this.setState({
          currentStyle: 'color'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config = _props.config,
          icon = _props$config.icon,
          className = _props$config.className,
          title = _props$config.title,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-colorpicker-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-color-picker',
          title: title || translations['components.controls.colorpicker.colorpicker']
        },
        _react2.default.createElement(
          _Option2.default,
          {
            onClick: onExpandEvent,
            className: (0, _classnames2.default)(className)
          },
          _react2.default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
exports.default = LayoutComponent;
module.exports = exports['default'];