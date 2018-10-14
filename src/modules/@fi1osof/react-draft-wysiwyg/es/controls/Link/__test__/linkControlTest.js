'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _draftJs = require('draft-js');

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

describe('LinkControl test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.link,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.equal(true);
  });

  it('should have 2 child elements by default', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.link,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.find(_Option2.default).length).to.equal(2);
  });

  it('should have no value for state variable link default', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.link,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    var state = control.state();
    _chai.assert.isNotTrue(state.expanded);
    _chai.assert.equal(state.link, undefined);
  });

  it('should convert links starting with www to start with http://', function () {
    var onChange = (0, _sinon.spy)();
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      config: _defaultToolbar2.default.link,
      onChange: onChange,
      editorState: editorState,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    control.setState({ expanded: true });
    var buttons = control.find('.rdw-option-wrapper');
    buttons.first().simulate('click');
    var inputs = control.find('.rdw-link-modal-input');
    inputs.last().simulate('change', { target: { name: 'linkTitle', value: 'the google' } });
    inputs.first().simulate('change', { target: { name: 'linkTarget', value: 'www.google.com' } });
    var addButton = control.find('.rdw-link-modal-btn').first();
    addButton.simulate('click');
    var lastCall = contentState.getLastCreatedEntityKey();
    _chai.assert.equal(contentState.getEntity(lastCall).getData().url, 'http://www.google.com');
  });
});