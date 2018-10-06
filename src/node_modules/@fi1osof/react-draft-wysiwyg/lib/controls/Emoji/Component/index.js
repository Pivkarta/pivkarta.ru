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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayoutComponent.__proto__ || (0, _getPrototypeOf2.default)(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
      var onChange = _this.props.onChange;

      onChange(event.target.innerHTML);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'renderEmojiModal',
    value: function renderEmojiModal() {
      var _this2 = this;

      var _props$config = this.props.config,
          popupClassName = _props$config.popupClassName,
          emojis = _props$config.emojis;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-emoji-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        emojis.map(function (emoji, index) {
          return _react2.default.createElement(
            'span',
            {
              key: index,
              className: 'rdw-emoji-icon',
              alt: '',
              onClick: _this2.onChange
            },
            emoji
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config2 = _props.config,
          icon = _props$config2.icon,
          className = _props$config2.className,
          title = _props$config2.title,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-emoji-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-emoji-control',
          'aria-expanded': expanded,
          title: title || translations['components.controls.emoji.emoji']
        },
        _react2.default.createElement(
          _Option2.default,
          {
            className: (0, _classnames2.default)(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent
          },
          _react2.default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderEmojiModal() : undefined
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
  translations: _propTypes2.default.object
} : {};
exports.default = LayoutComponent;
module.exports = exports['default'];