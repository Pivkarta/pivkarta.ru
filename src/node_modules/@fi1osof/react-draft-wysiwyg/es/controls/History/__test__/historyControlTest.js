'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _defaultToolbar = require('../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _i18n = require('../../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HistoryControl test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.history,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.equal(true);
  });

  it('should have 2 child elements', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.history,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.find(_Option2.default).length).to.equal(2);
  });
});