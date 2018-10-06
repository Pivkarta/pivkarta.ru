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

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAlign = function (_Component) {
  (0, _inherits3.default)(TextAlign, _Component);

  function TextAlign() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextAlign);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextAlign.__proto__ || (0, _getPrototypeOf2.default)(TextAlign)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentTextAlignment: undefined
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
    }, _this.addBlockAlignmentData = function (value) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;
      var currentTextAlignment = _this.state.currentTextAlignment;

      if (currentTextAlignment !== value) {
        onChange((0, _draftjsUtils.setBlockData)(editorState, { 'text-align': value }));
      } else {
        onChange((0, _draftjsUtils.setBlockData)(editorState, { 'text-align': undefined }));
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextAlign, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState !== this.props.editorState) {
        this.setState({
          currentTextAlignment: (0, _draftjsUtils.getSelectedBlocksMetadata)(properties.editorState).get('text-align')
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
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentTextAlignment = _state.currentTextAlignment;

      var TextAlignmentComponent = config.component || _Component3.default;
      return _react2.default.createElement(TextAlignmentComponent, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: { textAlignment: currentTextAlignment },
        onChange: this.addBlockAlignmentData
      });
    }
  }]);
  return TextAlign;
}(_react.Component);

exports.default = TextAlign;
TextAlign.propTypes = process.env.NODE_ENV !== "production" ? {
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};