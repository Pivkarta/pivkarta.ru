'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _toolbar = require('../../../utils/toolbar');

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inline = function (_Component) {
  (0, _inherits3.default)(Inline, _Component);

  function Inline() {
    (0, _classCallCheck3.default)(this, Inline);
    return (0, _possibleConstructorReturn3.default)(this, (Inline.__proto__ || (0, _getPrototypeOf2.default)(Inline)).apply(this, arguments));
  }

  (0, _createClass3.default)(Inline, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          currentState = _props.currentState,
          onChange = _props.onChange,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-inline-wrapper', config.className), 'aria-label': 'rdw-inline-control' },
        config.options.map(function (style, index) {
          return _react2.default.createElement(
            _Option2.default,
            {
              key: index,
              value: style,
              onClick: onChange,
              className: (0, _classnames2.default)(config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState.CODE,
              title: config[style].title || translations['components.controls.inline.' + style]
            },
            _react2.default.createElement('img', {
              alt: '',
              src: config[style].icon
            })
          );
        })
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          currentState = _props2.currentState,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-inline-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-inline-control',
          title: title
        },
        _react2.default.createElement('img', {
          src: (0, _toolbar.getFirstIcon)(config),
          alt: ''
        }),
        config.options.map(function (style, index) {
          return _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              key: index,
              value: style,
              className: (0, _classnames2.default)('rdw-inline-dropdownoption', config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState.CODE,
              title: config[style].title || translations['components.controls.inline.' + style]
            },
            _react2.default.createElement('img', {
              src: config[style].icon,
              alt: ''
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return Inline;
}(_react.Component);

// todo: make subscript less low


exports.default = Inline;
Inline.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
module.exports = exports['default'];