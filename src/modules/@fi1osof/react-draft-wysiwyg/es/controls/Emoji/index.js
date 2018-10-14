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

var _draftJs = require('draft-js');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function (_Component) {
  (0, _inherits3.default)(Emoji, _Component);

  function Emoji() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Emoji);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Emoji.__proto__ || (0, _getPrototypeOf2.default)(Emoji)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
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
    }, _this.addEmoji = function (emoji) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var contentState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), emoji, editorState.getCurrentInlineStyle());
      onChange(_draftJs.EditorState.push(editorState, contentState, 'insert-characters'));
      _this.doCollapse();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Emoji, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
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
      var expanded = this.state.expanded;

      var EmojiComponent = config.component || _Component3.default;
      return _react2.default.createElement(EmojiComponent, {
        config: config,
        translations: translations,
        onChange: this.addEmoji,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onCollpase: this.closeModal
      });
    }
  }]);
  return Emoji;
}(_react.Component);

// todo: unit test cases


exports.default = Emoji;
Emoji.propTypes = process.env.NODE_ENV !== "production" ? {
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};