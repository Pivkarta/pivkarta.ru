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

var _draftjsUtils = require('draftjs-utils');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = function (_Component) {
  (0, _inherits3.default)(ColorPicker, _Component);

  function ColorPicker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ColorPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorPicker.__proto__ || (0, _getPrototypeOf2.default)(ColorPicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentColor: undefined,
      currentBgColor: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleColor = function (style, color) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = (0, _draftjsUtils.toggleCustomInlineStyle)(editorState, style, color);
      if (newState) {
        onChange(newState);
      }
      _this.doCollapse();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ColorPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentColor: (0, _draftjsUtils.getSelectionCustomInlineStyle)(editorState, ['COLOR']).COLOR,
          currentBgColor: (0, _draftjsUtils.getSelectionCustomInlineStyle)(editorState, ['BGCOLOR']).BGCOLOR
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        newState.currentColor = (0, _draftjsUtils.getSelectionCustomInlineStyle)(properties.editorState, ['COLOR']).COLOR;
        newState.currentBgColor = (0, _draftjsUtils.getSelectionCustomInlineStyle)(properties.editorState, ['BGCOLOR']).BGCOLOR;
      }
      this.setState(newState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          currentColor = _state.currentColor,
          currentBgColor = _state.currentBgColor,
          expanded = _state.expanded;

      var ColorPickerComponent = config.component || _Component3.default;
      var color = currentColor && currentColor.substring(6);
      var bgColor = currentBgColor && currentBgColor.substring(8);
      return _react2.default.createElement(ColorPickerComponent, {
        config: config,
        translations: translations,
        onChange: this.toggleColor,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: { color: color, bgColor: bgColor }
      });
    }
  }]);
  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
exports.default = ColorPicker;