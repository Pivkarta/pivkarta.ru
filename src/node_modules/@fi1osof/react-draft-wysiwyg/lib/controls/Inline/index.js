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

var _draftjsUtils = require('draftjs-utils');

var _draftJs = require('draft-js');

var _common = require('../../utils/common');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inline = function (_Component) {
  (0, _inherits3.default)(Inline, _Component);

  function Inline() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Inline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Inline.__proto__ || (0, _getPrototypeOf2.default)(Inline)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyles: {}
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.toggleInlineStyle = function (style) {
      var newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = _draftJs.RichUtils.toggleInlineStyle(editorState, newStyle);
      if (style === 'subscript' || style === 'superscript') {
        var removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
        var contentState = _draftJs.Modifier.removeInlineStyle(newState.getCurrentContent(), newState.getSelection(), removeStyle);
        newState = _draftJs.EditorState.push(newState, contentState, 'change-inline-style');
      }
      if (newState) {
        onChange(newState);
      }
    }, _this.changeKeys = function (style) {
      if (style) {
        var st = {};
        (0, _common.forEach)(style, function (key, value) {
          st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
        });
        return st;
      }
      return undefined;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Inline, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentStyles: this.changeKeys((0, _draftjsUtils.getSelectionInlineStyle)(editorState))
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentStyles: this.changeKeys((0, _draftjsUtils.getSelectionInlineStyle)(properties.editorState))
        });
      }
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
          expanded = _state.expanded,
          currentStyles = _state.currentStyles;

      var InlineComponent = config.component || _Component3.default;
      return _react2.default.createElement(InlineComponent, {
        config: config,
        translations: translations,
        currentState: currentStyles,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.toggleInlineStyle
      });
    }
  }]);
  return Inline;
}(_react.Component);
// make subscript less low


exports.default = Inline;
Inline.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
module.exports = exports['default'];