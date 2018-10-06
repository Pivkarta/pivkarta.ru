'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _draftjsUtils = require('draftjs-utils');

var _draftJs = require('draft-js');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ImageRenderer test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);
  var entityKey = contentState.createEntity('IMAGE', 'MUTABLE', { src: 'testing' }).getLastCreatedEntityKey();
  var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

  it('should have a div when rendered', function () {
    var Image = (0, _index2.default)({
      isReadOnly: function isReadOnly() {
        return false;
      },
      isImageAlignmentEnabled: function isImageAlignmentEnabled() {
        return true;
      }
    });
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(Image, { block: (0, _draftjsUtils.getAllBlocks)(newEditorState).get(1), contentState: contentState })).childAt(0).type()).to.equal('span');
  });

  it('should have state initialized correctly', function () {
    var Image = (0, _index2.default)({
      isReadOnly: function isReadOnly() {
        return false;
      },
      isImageAlignmentEnabled: function isImageAlignmentEnabled() {
        return true;
      }
    });
    var control = (0, _enzyme.shallow)(_react2.default.createElement(Image, { block: (0, _draftjsUtils.getAllBlocks)(newEditorState).get(1), contentState: contentState }));
    _chai.assert.isNotTrue(control.state().hovered);
  });

  it('should have 1 child element by default', function () {
    var Image = (0, _index2.default)({
      isReadOnly: function isReadOnly() {
        return false;
      },
      isImageAlignmentEnabled: function isImageAlignmentEnabled() {
        return true;
      }
    });
    var control = (0, _enzyme.shallow)(_react2.default.createElement(Image, { block: (0, _draftjsUtils.getAllBlocks)(newEditorState).get(1), contentState: contentState }));
    (0, _chai.expect)(control.children().length).to.equal(1);
  });
});