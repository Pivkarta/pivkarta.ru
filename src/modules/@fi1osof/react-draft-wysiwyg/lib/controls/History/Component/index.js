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

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var History = function (_Component) {
  (0, _inherits3.default)(History, _Component);

  function History() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, History);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = History.__proto__ || (0, _getPrototypeOf2.default)(History)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (obj) {
      var onChange = _this.props.onChange;

      onChange(obj);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(History, [{
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props = this.props,
          config = _props.config,
          expanded = _props.expanded,
          doExpand = _props.doExpand,
          onExpandEvent = _props.onExpandEvent,
          doCollapse = _props.doCollapse,
          _props$currentState = _props.currentState,
          undoDisabled = _props$currentState.undoDisabled,
          redoDisabled = _props$currentState.redoDisabled,
          translations = _props.translations;
      var options = config.options,
          undo = config.undo,
          redo = config.redo,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-history-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-history-control',
          title: title || translations['components.controls.history.history']
        },
        _react2.default.createElement('img', {
          src: (0, _toolbar.getFirstIcon)(config),
          alt: ''
        }),
        options.indexOf('undo') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'undo',
            onClick: this.onChange,
            disabled: undoDisabled,
            className: (0, _classnames2.default)('rdw-history-dropdownoption', undo.className),
            title: undo.title || translations['components.controls.history.undo']
          },
          _react2.default.createElement('img', {
            src: undo.icon,
            alt: ''
          })
        ),
        options.indexOf('redo') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'redo',
            onClick: this.onChange,
            disabled: redoDisabled,
            className: (0, _classnames2.default)('rdw-history-dropdownoption', redo.className),
            title: redo.title || translations['components.controls.history.redo']
          },
          _react2.default.createElement('img', {
            src: redo.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          undo = _props2$config.undo,
          redo = _props2$config.redo,
          className = _props2$config.className,
          _props2$currentState = _props2.currentState,
          undoDisabled = _props2$currentState.undoDisabled,
          redoDisabled = _props2$currentState.redoDisabled,
          translations = _props2.translations;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-history-wrapper', className), 'aria-label': 'rdw-history-control' },
        options.indexOf('undo') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'undo',
            onClick: this.onChange,
            className: (0, _classnames2.default)(undo.className),
            disabled: undoDisabled,
            title: undo.title || translations['components.controls.history.undo']
          },
          _react2.default.createElement('img', {
            src: undo.icon,
            alt: ''
          })
        ),
        options.indexOf('redo') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'redo',
            onClick: this.onChange,
            className: (0, _classnames2.default)(redo.className),
            disabled: redoDisabled,
            title: redo.title || translations['components.controls.history.redo']
          },
          _react2.default.createElement('img', {
            src: redo.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;

      if (config.inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return History;
}(_react.Component);

exports.default = History;
History.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
module.exports = exports['default'];