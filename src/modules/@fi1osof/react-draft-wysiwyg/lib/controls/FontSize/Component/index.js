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

var _Dropdown = require('../../../components/Dropdown');

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
      defaultFontSize: undefined
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var editorStyles = window.getComputedStyle(editorElm[0]);
        var defaultFontSize = editorStyles.getPropertyValue('font-size');
        defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          defaultFontSize: defaultFontSize
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
          dropdownClassName = _props$config.dropdownClassName,
          options = _props$config.options,
          title = _props$config.title,
          onChange = _props.onChange,
          expanded = _props.expanded,
          doCollapse = _props.doCollapse,
          onExpandEvent = _props.onExpandEvent,
          doExpand = _props.doExpand,
          translations = _props.translations;
      var currentFontSize = this.props.currentState.fontSize;
      var defaultFontSize = this.state.defaultFontSize;

      // defaultFontSize = Number(defaultFontSize);

      defaultFontSize = defaultFontSize;

      currentFontSize = currentFontSize || options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize;

      console.log("currentFontSize", currentFontSize);

      // currentFontSize = currentFontSize && typeof currentFontSize === "object" ? currentFontSize.title : currentFontSize;

      if (currentFontSize) {
        var option = options.find(function (n) {
          return n.size === currentFontSize;
        });

        if (option) {
          currentFontSize = option.title;
        }
        console.log("currentFontSize2", currentFontSize, option);
      }

      return _react2.default.createElement(
        'div',
        { className: 'custom-rdw-fontsize-wrapper', 'aria-label': 'custom-rdw-font-size-control' },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('custom-rdw-fontsize-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.fontsize.fontsize']
          },
          currentFontSize ? _react2.default.createElement(
            'span',
            null,
            currentFontSize
          ) : _react2.default.createElement('img', { src: icon, alt: '' }),
          options.map(function (_ref2, index) {
            var title = _ref2.title,
                size = _ref2.size;
            return _react2.default.createElement(
              _Dropdown.DropdownOption,
              {
                className: 'custom-rdw-fontsize-option',
                active: currentFontSize === size,
                value: size,
                key: index
              },
              title
            );
          })
        )
      );
    }
  }]);
  return LayoutComponent;
}(_react.Component);

exports.default = LayoutComponent;
LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
module.exports = exports['default'];