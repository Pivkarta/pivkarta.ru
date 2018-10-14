'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Option test suite', function () {
  it('should have a span when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      {
        value: 'b',
        onClick: function onClick() {}
      },
      _react2.default.createElement(
        'span',
        null,
        'testing'
      )
    )).childAt(0).type()).to.equal('div');
  });

  it('should have child element passed after mount', function () {
    var option = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      {
        value: 'b',
        onClick: function onClick() {}
      },
      _react2.default.createElement(
        'span',
        null,
        'testing'
      )
    ));
    (0, _chai.expect)(option.children().length).to.equal(1);
    (0, _chai.expect)(option.children().type()).to.equal('div');
  });

  it('should execute funcion passed in onClick props when clicked', function () {
    var onClick = (0, _sinon.spy)();
    var option = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      {
        value: 'b',
        onClick: onClick
      },
      _react2.default.createElement(
        'span',
        null,
        'testing'
      )
    ));
    option.children().simulate('click');
    (0, _chai.expect)(onClick.calledOnce).to.equal(true);
  });

  it('should not execute funcion passed in onClick props when clicked if disabled', function () {
    var onClick = (0, _sinon.spy)();
    var option = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      {
        value: 'b',
        onClick: onClick,
        disabled: true
      },
      _react2.default.createElement(
        'span',
        null,
        'testing'
      )
    ));
    option.children().simulate('click');
    (0, _chai.expect)(onClick.called).to.equal(false);
  });
});