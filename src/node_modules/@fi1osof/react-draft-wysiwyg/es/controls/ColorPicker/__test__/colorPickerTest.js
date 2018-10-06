'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _defaultToolbar = require('../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _i18n = require('../../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ColorPicker test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.colorPicker,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.equal(true);
  });

  it('should correctly set default state values', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.colorPicker,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    var state = control.state();
    _chai.assert.isNotTrue(state.expanded);
    _chai.assert.isUndefined(state.currentColor);
    _chai.assert.isUndefined(state.currentBgColor);
  });

  it('should set variable signalExpanded to true when first child is clicked', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.colorPicker,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    var colorPicker = control.find('ColorPicker');
    _chai.assert.isNotTrue(colorPicker.instance().signalExpanded);
    control.find('Option').simulate('click');
    _chai.assert.isTrue(colorPicker.instance().signalExpanded);
  });
});