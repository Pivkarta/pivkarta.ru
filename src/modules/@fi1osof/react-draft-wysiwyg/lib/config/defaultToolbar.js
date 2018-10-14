'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bold = require('../../images/bold.svg');

var _bold2 = _interopRequireDefault(_bold);

var _italic = require('../../images/italic.svg');

var _italic2 = _interopRequireDefault(_italic);

var _underline = require('../../images/underline.svg');

var _underline2 = _interopRequireDefault(_underline);

var _strikethrough = require('../../images/strikethrough.svg');

var _strikethrough2 = _interopRequireDefault(_strikethrough);

var _monospace = require('../../images/monospace.svg');

var _monospace2 = _interopRequireDefault(_monospace);

var _fontSize = require('../../images/font-size.svg');

var _fontSize2 = _interopRequireDefault(_fontSize);

var _indent = require('../../images/indent.svg');

var _indent2 = _interopRequireDefault(_indent);

var _outdent = require('../../images/outdent.svg');

var _outdent2 = _interopRequireDefault(_outdent);

var _listOrdered = require('../../images/list-ordered.svg');

var _listOrdered2 = _interopRequireDefault(_listOrdered);

var _listUnordered = require('../../images/list-unordered.svg');

var _listUnordered2 = _interopRequireDefault(_listUnordered);

var _alignLeft = require('../../images/align-left.svg');

var _alignLeft2 = _interopRequireDefault(_alignLeft);

var _alignCenter = require('../../images/align-center.svg');

var _alignCenter2 = _interopRequireDefault(_alignCenter);

var _alignRight = require('../../images/align-right.svg');

var _alignRight2 = _interopRequireDefault(_alignRight);

var _alignJustify = require('../../images/align-justify.svg');

var _alignJustify2 = _interopRequireDefault(_alignJustify);

var _color = require('../../images/color.svg');

var _color2 = _interopRequireDefault(_color);

var _eraser = require('../../images/eraser.svg');

var _eraser2 = _interopRequireDefault(_eraser);

var _link = require('../../images/link.svg');

var _link2 = _interopRequireDefault(_link);

var _unlink = require('../../images/unlink.svg');

var _unlink2 = _interopRequireDefault(_unlink);

var _emoji = require('../../images/emoji.svg');

var _emoji2 = _interopRequireDefault(_emoji);

var _embedded = require('../../images/embedded.svg');

var _embedded2 = _interopRequireDefault(_embedded);

var _image = require('../../images/image.svg');

var _image2 = _interopRequireDefault(_image);

var _undo = require('../../images/undo.svg');

var _undo2 = _interopRequireDefault(_undo);

var _redo = require('../../images/redo.svg');

var _redo2 = _interopRequireDefault(_redo);

var _subscript = require('../../images/subscript.svg');

var _subscript2 = _interopRequireDefault(_subscript);

var _superscript = require('../../images/superscript.svg');

var _superscript2 = _interopRequireDefault(_superscript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
exports.default = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { icon: _bold2.default, className: undefined, title: undefined },
    italic: { icon: _italic2.default, className: undefined, title: undefined },
    underline: { icon: _underline2.default, className: undefined, title: undefined },
    strikethrough: { icon: _strikethrough2.default, className: undefined, title: undefined },
    monospace: { icon: _monospace2.default, className: undefined, title: undefined },
    superscript: { icon: _superscript2.default, className: undefined, title: undefined },
    subscript: { icon: _subscript2.default, className: undefined, title: undefined }
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontSize: {
    icon: _fontSize2.default,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: _listUnordered2.default, className: undefined, title: undefined },
    ordered: { icon: _listOrdered2.default, className: undefined, title: undefined },
    indent: { icon: _indent2.default, className: undefined, title: undefined },
    outdent: { icon: _outdent2.default, className: undefined, title: undefined },
    title: undefined
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: _alignLeft2.default, className: undefined, title: undefined },
    center: { icon: _alignCenter2.default, className: undefined, title: undefined },
    right: { icon: _alignRight2.default, className: undefined, title: undefined },
    justify: { icon: _alignJustify2.default, className: undefined, title: undefined },
    title: undefined
  },
  colorPicker: {
    icon: _color2.default,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)', 'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)', 'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)', 'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)', 'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    title: undefined
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { icon: _link2.default, className: undefined, title: undefined },
    unlink: { icon: _unlink2.default, className: undefined, title: undefined }
  },
  emoji: {
    icon: _emoji2.default,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯'],
    title: undefined
  },
  embedded: {
    icon: _embedded2.default,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto'
    },
    title: undefined
  },
  image: {
    icon: _image2.default,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    previewImage: false,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    },
    title: undefined
  },
  remove: { icon: _eraser2.default, className: undefined, component: undefined, title: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: _undo2.default, className: undefined, title: undefined },
    redo: { icon: _redo2.default, className: undefined, title: undefined },
    title: undefined
  }
};

/**
 * - add option property to color-picker, emoji.
 */

module.exports = exports['default'];