'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMention;

var _draftJs = require('draft-js');

var _draftjsUtils = require('draftjs-utils');

function addMention(editorState, onChange, separator, trigger, suggestion) {
  var value = suggestion.value,
      url = suggestion.url;

  var entityKey = editorState.getCurrentContent().createEntity('MENTION', 'IMMUTABLE', { text: '' + trigger + value, value: value, url: url }).getLastCreatedEntityKey();
  var selectedBlock = (0, _draftjsUtils.getSelectedBlock)(editorState);
  var selectedBlockText = selectedBlock.getText();
  var focusOffset = editorState.getSelection().focusOffset;
  var mentionIndex = (selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0) + 1;
  var spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === ' ') {
    spaceAlreadyPresent = true;
  }
  var updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset: focusOffset
  });
  var newEditorState = _draftJs.EditorState.acceptSelection(editorState, updatedSelection);
  var contentState = _draftJs.Modifier.replaceText(newEditorState.getCurrentContent(), updatedSelection, '' + trigger + value, newEditorState.getCurrentInlineStyle(), entityKey);
  newEditorState = _draftJs.EditorState.push(newEditorState, contentState, 'insert-characters');

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: mentionIndex + value.length + trigger.length,
      focusOffset: mentionIndex + value.length + trigger.length
    });
    newEditorState = _draftJs.EditorState.acceptSelection(newEditorState, updatedSelection);
    contentState = _draftJs.Modifier.insertText(newEditorState.getCurrentContent(), updatedSelection, ' ', newEditorState.getCurrentInlineStyle(), undefined);
  }
  onChange(_draftJs.EditorState.push(newEditorState, contentState, 'insert-characters'));
}