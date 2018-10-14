'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Inline = require('./Inline');

var _Inline2 = _interopRequireDefault(_Inline);

var _BlockType = require('./BlockType');

var _BlockType2 = _interopRequireDefault(_BlockType);

var _FontSize = require('./FontSize');

var _FontSize2 = _interopRequireDefault(_FontSize);

var _FontFamily = require('./FontFamily');

var _FontFamily2 = _interopRequireDefault(_FontFamily);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _TextAlign = require('./TextAlign');

var _TextAlign2 = _interopRequireDefault(_TextAlign);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Embedded = require('./Embedded');

var _Embedded2 = _interopRequireDefault(_Embedded);

var _Emoji = require('./Emoji');

var _Emoji2 = _interopRequireDefault(_Emoji);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _Remove = require('./Remove');

var _Remove2 = _interopRequireDefault(_Remove);

var _History = require('./History');

var _History2 = _interopRequireDefault(_History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controls = {
  inline: _Inline2.default,
  blockType: _BlockType2.default,
  fontSize: _FontSize2.default,
  fontFamily: _FontFamily2.default,
  list: _List2.default,
  textAlign: _TextAlign2.default,
  colorPicker: _ColorPicker2.default,
  link: _Link2.default,
  embedded: _Embedded2.default,
  emoji: _Emoji2.default,
  image: _Image2.default,
  remove: _Remove2.default,
  history: _History2.default
};

exports.default = controls;
module.exports = exports['default'];