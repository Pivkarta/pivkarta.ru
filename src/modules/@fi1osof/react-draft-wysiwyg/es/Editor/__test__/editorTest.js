'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Editor test suite', function () {
  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(_2.default, null)).childAt(0).type()).to.equal('div');
  });

  it('should have an editorState object in state', function () {
    var editor = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    _chai.assert.isDefined(editor.state().editorState);
    _chai.assert.isDefined(editor.state().editorFocused);
  });

  it('should have toolbarHidden as false by default', function () {
    var editor = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    (0, _chai.expect)(editor.find('.rdw-editor-toolbar')).to.have.length(1);
  });
});