'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DropdownOption test suite', function () {
  it('should have a li when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(
        'div',
        null,
        'test'
      )
    )).childAt(0).type()).to.equal('li');
  });

  it('should click event should trigger onSelect function call', function () {
    var onSelect = (0, _sinon.spy)();
    var option = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { onSelect: onSelect },
      _react2.default.createElement(
        'div',
        null,
        'test'
      )
    ));
    option.childAt(0).simulate('click');
    (0, _chai.expect)(onSelect.called).to.equal(true);
  });
});