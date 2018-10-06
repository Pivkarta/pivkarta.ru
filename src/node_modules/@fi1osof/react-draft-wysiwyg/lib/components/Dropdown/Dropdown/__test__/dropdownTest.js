'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _DropdownOption = require('../../DropdownOption');

var _DropdownOption2 = _interopRequireDefault(_DropdownOption);

var _modals = require('../../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Dropdown test suite', function () {
  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      {
        modalHandler: new _modals2.default()
      },
      _react2.default.createElement(
        'span',
        null,
        'test'
      ),
      _react2.default.createElement(
        _DropdownOption2.default,
        null,
        'test1'
      )
    )).childAt(0).type()).to.equal('div');
  });
});