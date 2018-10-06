'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _draftJs = require('draft-js');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _defaultToolbar = require('../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _i18n = require('../../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies
describe('TextAlignControl test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.textAlign,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.equal(true);
  });

  it('should have 4 child elements by default', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.textAlign,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.find(_Option2.default).length).to.equal(4);
  });

  it('should have 5 child options of dropdown child elements if inDropdown is true', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: (0, _extends3.default)({}, _defaultToolbar2.default.textAlign, { inDropdown: true }),
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.childAt(0).childAt(0).prop('children').length).to.equal(5);
  });

  it('should execute onChange when any of first any child elements is clicked', function () {
    var onChange = (0, _sinon.spy)();
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: onChange,
      editorState: editorState,
      config: _defaultToolbar2.default.textAlign,
      translations: _i18n2.default.en,
      modalHandler: new _modals2.default()
    }));
    control.find(_Option2.default).at(0).simulate('click');
    _chai.assert.isTrue(onChange.calledOnce);
    control.find(_Option2.default).at(1).simulate('click');
    _chai.assert.equal(onChange.callCount, 2);
    control.find(_Option2.default).at(2).simulate('click');
    _chai.assert.equal(onChange.callCount, 3);
    control.find(_Option2.default).at(3).simulate('click');
    _chai.assert.equal(onChange.callCount, 4);
  });
}); // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-line import/no-extraneous-dependencies