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

var _draftjsUtils = require('draftjs-utils');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, List);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = List.__proto__ || (0, _getPrototypeOf2.default)(List)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentBlock: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.onChange = function (value) {
      if (value === 'unordered') {
        _this.toggleBlockType('unordered-list-item');
      } else if (value === 'ordered') {
        _this.toggleBlockType('ordered-list-item');
      } else if (value === 'indent') {
        _this.adjustDepth(1);
      } else {
        _this.adjustDepth(-1);
      }
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
    }, _this.toggleBlockType = function (blockType) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          editorState = _this$props.editorState;

      var newState = _draftJs.RichUtils.toggleBlockType(editorState, blockType);
      if (newState) {
        onChange(newState);
      }
    }, _this.adjustDepth = function (adjustment) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          editorState = _this$props2.editorState;

      var newState = (0, _draftjsUtils.changeDepth)(editorState, adjustment, 4);
      if (newState) {
        onChange(newState);
      }
    }, _this.isIndentDisabled = function () {
      var editorState = _this.props.editorState;
      var currentBlock = _this.state.currentBlock;

      var previousBlock = (0, _draftjsUtils.getBlockBeforeSelectedBlock)(editorState);
      if (!previousBlock || !(0, _draftjsUtils.isListBlock)(currentBlock) || previousBlock.get('type') !== currentBlock.get('type') || previousBlock.get('depth') < currentBlock.get('depth')) {
        return true;
      }
      return false;
    }, _this.isOutdentDisabled = function () {
      var currentBlock = _this.state.currentBlock;

      return !currentBlock || !(0, _draftjsUtils.isListBlock)(currentBlock) || currentBlock.get('depth') <= 0;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(List, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({ currentBlock: (0, _draftjsUtils.getSelectedBlock)(editorState) });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        var currentBlock = (0, _draftjsUtils.getSelectedBlock)(properties.editorState);
        this.setState({ currentBlock: (0, _draftjsUtils.getSelectedBlock)(properties.editorState) });
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
          currentBlock = _state.currentBlock;

      var ListComponent = config.component || _Component3.default;
      var listType = void 0;
      if (currentBlock.get('type') === 'unordered-list-item') {
        listType = 'unordered';
      } else if (currentBlock.get('type') === 'ordered-list-item') {
        listType = 'ordered';
      }
      var indentDisabled = this.isIndentDisabled();
      var outdentDisabled = this.isOutdentDisabled();
      return _react2.default.createElement(ListComponent, {
        config: config,
        translations: translations,
        currentState: { listType: listType },
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.onChange,
        indentDisabled: indentDisabled,
        outdentDisabled: outdentDisabled
      });
    }
  }]);
  return List;
}(_react.Component);

exports.default = List;
List.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};