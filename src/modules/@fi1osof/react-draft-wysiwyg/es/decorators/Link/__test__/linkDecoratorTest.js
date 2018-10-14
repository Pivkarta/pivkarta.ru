'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _draftJs = require('draft-js');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LinkDecorator test suite', function () {
  var LinkDecorator = (0, _2.default)({ showOpenOptionOnHover: true });
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var entityKey = contentState.createEntity('LINK', 'MUTABLE', { title: 'title', url: 'url' }).getLastCreatedEntityKey();

  it('should have a div when rendered', function () {
    var Link = LinkDecorator.component;
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(
      Link,
      { entityKey: entityKey, contentState: contentState },
      'Link'
    )).childAt(0).type()).to.equal('span');
  });

  it('should have state initialized correctly', function () {
    var Link = LinkDecorator.component;
    var control = (0, _enzyme.shallow)(_react2.default.createElement(
      Link,
      { entityKey: entityKey, contentState: contentState },
      'Link'
    ));
    _chai.assert.isNotTrue(control.state().showPopOver);
  });

  it('should have 1 child element by default', function () {
    var Link = LinkDecorator.component;
    var control = (0, _enzyme.shallow)(_react2.default.createElement(
      Link,
      { entityKey: entityKey, contentState: contentState },
      'Link'
    ));
    (0, _chai.expect)(control.children().length).to.equal(1);
  });

  it('should have 2 child element when showPopOver is true', function () {
    var Link = LinkDecorator.component;
    var control = (0, _enzyme.mount)(_react2.default.createElement(
      Link,
      { entityKey: entityKey, contentState: contentState },
      'Link'
    ));
    control.setState({ showPopOver: true });
    (0, _chai.expect)(control.childAt(0).children().length).to.equal(2);
  });
});