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

var _toolbar = require('../../../utils/toolbar');

var _Dropdown = require('../../../components/Dropdown');

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutComponent = function (_Component) {
  (0, _inherits3.default)(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayoutComponent.__proto__ || (0, _getPrototypeOf2.default)(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.options = ['unordered', 'ordered', 'indent', 'outdent'], _this.toggleBlockType = function (blockType) {
      var onChange = _this.props.onChange;

      onChange(blockType);
    }, _this.indent = function () {
      var onChange = _this.props.onChange;

      onChange('indent');
    }, _this.outdent = function () {
      var onChange = _this.props.onChange;

      onChange('outdent');
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'renderInFlatList',


    // todo: evaluate refactoring this code to put a loop there and in other places also in code
    // hint: it will require moving click handlers
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          listType = _props.currentState.listType,
          translations = _props.translations,
          indentDisabled = _props.indentDisabled,
          outdentDisabled = _props.outdentDisabled;
      var options = config.options,
          unordered = config.unordered,
          ordered = config.ordered,
          indent = config.indent,
          outdent = config.outdent,
          className = config.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-list-wrapper', className), 'aria-label': 'rdw-list-control' },
        options.indexOf('unordered') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'unordered',
            onClick: this.toggleBlockType,
            className: (0, _classnames2.default)(unordered.className),
            active: listType === 'unordered',
            title: unordered.title || translations['components.controls.list.unordered']
          },
          _react2.default.createElement('img', {
            src: unordered.icon,
            alt: ''
          })
        ),
        options.indexOf('ordered') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'ordered',
            onClick: this.toggleBlockType,
            className: (0, _classnames2.default)(ordered.className),
            active: listType === 'ordered',
            title: ordered.title || translations['components.controls.list.ordered']
          },
          _react2.default.createElement('img', {
            src: ordered.icon,
            alt: ''
          })
        ),
        options.indexOf('indent') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            onClick: this.indent,
            disabled: indentDisabled,
            className: (0, _classnames2.default)(indent.className),
            title: indent.title || translations['components.controls.list.indent']
          },
          _react2.default.createElement('img', {
            src: indent.icon,
            alt: ''
          })
        ),
        options.indexOf('outdent') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            onClick: this.outdent,
            disabled: outdentDisabled,
            className: (0, _classnames2.default)(outdent.className),
            title: outdent.title || translations['components.controls.list.outdent']
          },
          _react2.default.createElement('img', {
            src: outdent.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _this2 = this;

      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doCollapse = _props2.doCollapse,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          onChange = _props2.onChange,
          listType = _props2.currentState.listType,
          translations = _props2.translations;
      var options = config.options,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-list-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-list-control',
          title: title || translations['components.controls.list.list']
        },
        _react2.default.createElement('img', {
          src: (0, _toolbar.getFirstIcon)(config),
          alt: ''
        }),
        this.options.filter(function (option) {
          return options.indexOf(option) >= 0;
        }).map(function (option, index) {
          return _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              key: index,
              value: option,
              disabled: _this2.props[option + 'Disabled'],
              className: (0, _classnames2.default)('rdw-list-dropdownOption', config[option].className),
              active: listType === option,
              title: config[option].title || translations['components.controls.list.' + option]
            },
            _react2.default.createElement('img', {
              src: config[option].icon,
              alt: ''
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return LayoutComponent;
}(_react.Component);

exports.default = LayoutComponent;
LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object,
  indentDisabled: _propTypes2.default.bool,
  outdentDisabled: _propTypes2.default.bool
} : {};