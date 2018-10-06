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
      defaultFontFamily: undefined
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var editorStyles = window.getComputedStyle(editorElm[0]);
        var defaultFontFamily = editorStyles.getPropertyValue('font-family');
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          defaultFontFamily: defaultFontFamily
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultFontFamily = this.state.defaultFontFamily;
      var _props = this.props,
          _props$config = _props.config,
          className = _props$config.className,
          dropdownClassName = _props$config.dropdownClassName,
          options = _props$config.options,
          title = _props$config.title,
          translations = _props.translations,
          onChange = _props.onChange,
          expanded = _props.expanded,
          doCollapse = _props.doCollapse,
          onExpandEvent = _props.onExpandEvent,
          doExpand = _props.doExpand;
      var currentFontFamily = this.props.currentState.fontFamily;

      currentFontFamily = currentFontFamily || options && defaultFontFamily && options.some(function (opt) {
        return opt.toLowerCase() === defaultFontFamily.toLowerCase();
      }) && defaultFontFamily;
      return _react2.default.createElement(
        'div',
        { className: 'rdw-fontfamily-wrapper', 'aria-label': 'rdw-font-family-control' },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('rdw-fontfamily-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)('rdw-fontfamily-optionwrapper', dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.fontfamily.fontfamily']
          },
          _react2.default.createElement(
            'span',
            { className: 'rdw-fontfamily-placeholder' },
            currentFontFamily || translations['components.controls.fontfamily.fontfamily']
          ),
          options.map(function (family, index) {
            return _react2.default.createElement(
              _Dropdown.DropdownOption,
              {
                active: currentFontFamily === family,
                value: family,
                key: index
              },
              family
            );
          })
        )
      );
    }
  }]);
  return LayoutComponent;
}(_react.Component);

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
exports.default = LayoutComponent;