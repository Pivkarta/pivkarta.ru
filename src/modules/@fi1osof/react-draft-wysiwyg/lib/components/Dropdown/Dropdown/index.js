'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.css');

var _common = require('../../../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_Component) {
  (0, _inherits3.default)(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      highlighted: -1
    }, _this.onChange = function (value) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
      _this.toggleExpansion();
    }, _this.setHighlighted = function (highlighted) {
      _this.setState({
        highlighted: highlighted
      });
    }, _this.toggleExpansion = function () {
      var _this$props = _this.props,
          doExpand = _this$props.doExpand,
          doCollapse = _this$props.doCollapse,
          expanded = _this$props.expanded;

      if (expanded) {
        doCollapse();
      } else {
        doExpand();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          highlighted: -1
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          expanded = _props.expanded,
          children = _props.children,
          className = _props.className,
          optionWrapperClassName = _props.optionWrapperClassName,
          ariaLabel = _props.ariaLabel,
          onExpandEvent = _props.onExpandEvent,
          title = _props.title;
      var highlighted = this.state.highlighted;

      var options = children.slice(1, children.length);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-dropdown-wrapper', className),
          'aria-expanded': expanded,
          'aria-label': ariaLabel || 'rdw-dropdown'
        },
        _react2.default.createElement(
          'a',
          {
            className: 'rdw-dropdown-selectedtext',
            onClick: onExpandEvent,
            title: title
          },
          children[0],
          _react2.default.createElement('div', {
            className: (0, _classnames2.default)({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded
            })
          })
        ),
        expanded ? _react2.default.createElement(
          'ul',
          {
            className: (0, _classnames2.default)('rdw-dropdown-optionwrapper', optionWrapperClassName),
            onClick: _common.stopPropagation
          },
          _react2.default.Children.map(options, function (option, index) {
            var temp = option && _react2.default.cloneElement(option, {
              onSelect: _this2.onChange,
              highlighted: highlighted === index,
              setHighlighted: _this2.setHighlighted,
              index: index
            });
            return temp;
          })
        ) : undefined
      );
    }
  }]);
  return Dropdown;
}(_react.Component);

exports.default = Dropdown;
Dropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  optionWrapperClassName: _propTypes2.default.string,
  ariaLabel: _propTypes2.default.string,
  title: _propTypes2.default.string
} : {};
module.exports = exports['default'];