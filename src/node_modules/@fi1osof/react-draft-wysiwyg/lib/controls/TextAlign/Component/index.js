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

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

var _toolbar = require('../../../utils/toolbar');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAlign = function (_Component) {
  (0, _inherits3.default)(TextAlign, _Component);

  function TextAlign() {
    (0, _classCallCheck3.default)(this, TextAlign);
    return (0, _possibleConstructorReturn3.default)(this, (TextAlign.__proto__ || (0, _getPrototypeOf2.default)(TextAlign)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextAlign, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          _props$config = _props.config,
          options = _props$config.options,
          left = _props$config.left,
          center = _props$config.center,
          right = _props$config.right,
          justify = _props$config.justify,
          className = _props$config.className,
          onChange = _props.onChange,
          textAlignment = _props.currentState.textAlignment,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-text-align-wrapper', className), 'aria-label': 'rdw-textalign-control' },
        options.indexOf('left') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'left',
            className: (0, _classnames2.default)(left.className),
            active: textAlignment === 'left',
            onClick: onChange,
            title: left.title || translations['components.controls.textalign.left']
          },
          _react2.default.createElement('img', {
            src: left.icon,
            alt: ''
          })
        ),
        options.indexOf('center') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'center',
            className: (0, _classnames2.default)(center.className),
            active: textAlignment === 'center',
            onClick: onChange,
            title: center.title || translations['components.controls.textalign.center']
          },
          _react2.default.createElement('img', {
            src: center.icon,
            alt: ''
          })
        ),
        options.indexOf('right') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'right',
            className: (0, _classnames2.default)(right.className),
            active: textAlignment === 'right',
            onClick: onChange,
            title: right.title || translations['components.controls.textalign.right']
          },
          _react2.default.createElement('img', {
            src: right.icon,
            alt: ''
          })
        ),
        options.indexOf('justify') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'justify',
            className: (0, _classnames2.default)(justify.className),
            active: textAlignment === 'justify',
            onClick: onChange,
            title: justify.title || translations['components.controls.textalign.justify']
          },
          _react2.default.createElement('img', {
            src: justify.icon,
            alt: ''
          })
        )
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
          textAlignment = _props2.currentState.textAlignment,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var options = config.options,
          left = config.left,
          center = config.center,
          right = config.right,
          justify = config.justify,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-text-align-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-textalign-control',
          title: title || translations['components.controls.textalign.textalign']
        },
        _react2.default.createElement('img', {
          src: textAlignment && config[textAlignment] && config[textAlignment].icon || (0, _toolbar.getFirstIcon)(config),
          alt: ''
        }),
        options.indexOf('left') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'left',
            active: textAlignment === 'left',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', left.className),
            title: left.title || translations['components.controls.textalign.left']
          },
          _react2.default.createElement('img', {
            src: left.icon,
            alt: ''
          })
        ),
        options.indexOf('center') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'center',
            active: textAlignment === 'center',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', center.className),
            title: center.title || translations['components.controls.textalign.center']
          },
          _react2.default.createElement('img', {
            src: center.icon,
            alt: ''
          })
        ),
        options.indexOf('right') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'right',
            active: textAlignment === 'right',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', right.className),
            title: right.title || translations['components.controls.textalign.right']
          },
          _react2.default.createElement('img', {
            src: right.icon,
            alt: ''
          })
        ),
        options.indexOf('justify') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'justify',
            active: textAlignment === 'justify',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', justify.className),
            title: justify.title || translations['components.controls.textalign.justify']
          },
          _react2.default.createElement('img', {
            src: justify.icon,
            alt: ''
          })
        )
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
  return TextAlign;
}(_react.Component);

exports.default = TextAlign;
TextAlign.propTypes = process.env.NODE_ENV !== "production" ? {
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