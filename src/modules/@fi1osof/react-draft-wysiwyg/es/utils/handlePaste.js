'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePastedText = undefined;

var _draftjsUtils = require('draftjs-utils');

var _draftJs = require('draft-js');

var _htmlToDraftjs = require('html-to-draftjs');

var _htmlToDraftjs2 = _interopRequireDefault(_htmlToDraftjs);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlePastedText = exports.handlePastedText = function handlePastedText(text, html, editorState, onChange) {
  var selectedBlock = (0, _draftjsUtils.getSelectedBlock)(editorState);
  if (selectedBlock && selectedBlock.type === 'code') {
    var contentState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, editorState.getCurrentInlineStyle());
    onChange(_draftJs.EditorState.push(editorState, contentState, 'insert-characters'));
    return true;
  }
  // else if (html) {
  //   const contentBlock = htmlToDraft(html);
  //   let blockMap = new OrderedMap({});
  //   contentBlock.contentBlocks.forEach(block => {
  //     blockMap = blockMap.set(block.get('key'), block);
  //   });
  //   let contentState = editorState.getCurrentContent();
  //   contentBlock.entityMap.forEach((value, key) => {
  //     contentState = contentState.mergeEntityData(key, value);
  //   });
  //   contentState = Modifier.replaceWithFragment(
  //     contentState,
  //     editorState.getSelection(),
  //     blockMap,
  //   );
  //   onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  //   return true;
  // }
  return false;
};