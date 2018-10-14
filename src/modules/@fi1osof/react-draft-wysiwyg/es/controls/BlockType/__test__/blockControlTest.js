'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _draftJs = require('draft-js');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _defaultToolbar = require('../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _i18n = require('../../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Block test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div at root when rendered', function () {
    var block = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: (0, _extends3.default)({}, _defaultToolbar2.default.blockType, { inDropdown: false }),
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(block.html().startsWith('<div')).to.equal(true);
  });

  it('should have a dropdown child component defined', function () {
    var block = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.blockType,
      modalHandler: new _modals2.default(),
      translations: _i18n2.default.en
    }));
    (0, _chai.expect)(block.find('Dropdown').length).to.equal(1);
  });

  it('should have 9 child elements when inDropdown is false', function () {
    var block = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: (0, _extends3.default)({}, _defaultToolbar2.default.blockType, { inDropdown: false }),
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(block.find('Option').length).to.equal(9);
  });
});