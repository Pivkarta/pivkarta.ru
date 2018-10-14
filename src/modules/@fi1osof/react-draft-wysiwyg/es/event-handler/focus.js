'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FocusHandler = function FocusHandler() {
  var _this = this;

  (0, _classCallCheck3.default)(this, FocusHandler);
  this.inputFocused = false;
  this.editorMouseDown = false;

  this.onEditorMouseDown = function () {
    _this.editorFocused = true;
  };

  this.onInputMouseDown = function () {
    _this.inputFocused = true;
  };

  this.isEditorBlur = function (event) {
    if ((event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') && !_this.editorFocused) {
      _this.inputFocused = false;
      return true;
    } else if ((event.target.tagName !== 'INPUT' || event.target.tagName !== 'LABEL') && !_this.inputFocused) {
      _this.editorFocused = false;
      return true;
    }
    return false;
  };

  this.isEditorFocused = function () {
    if (!_this.inputFocused) {
      return true;
    }
    _this.inputFocused = false;
    return false;
  };

  this.isToolbarFocused = function () {
    if (!_this.editorFocused) {
      return true;
    }
    _this.editorFocused = false;
    return false;
  };

  this.isInputFocused = function () {
    return _this.inputFocused;
  };
};

exports.default = FocusHandler;