'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _common = require('../../../utils/common');

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayoutComponent.__proto__ || (0, _getPrototypeOf2.default)(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      embeddedLink: '',
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width
    }, _this.onChange = function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          embeddedLink = _this$state.embeddedLink,
          height = _this$state.height,
          width = _this$state.width;

      onChange(embeddedLink, height, width);
    }, _this.updateValue = function (event) {
      _this.setState((0, _defineProperty3.default)({}, '' + event.target.name, event.target.value));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        var _props$config$default = this.props.config.defaultSize,
            height = _props$config$default.height,
            width = _props$config$default.width;

        this.setState({
          embeddedLink: '',
          height: height,
          width: width
        });
      }
    }
  }, {
    key: 'rendeEmbeddedLinkModal',
    value: function rendeEmbeddedLinkModal() {
      var _state = this.state,
          embeddedLink = _state.embeddedLink,
          height = _state.height,
          width = _state.width;
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-embedded-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'div',
          { className: 'rdw-embedded-modal-header' },
          _react2.default.createElement(
            'span',
            { className: 'rdw-embedded-modal-header-option' },
            translations['components.controls.embedded.embeddedlink'],
            _react2.default.createElement('span', { className: 'rdw-embedded-modal-header-label' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'rdw-embedded-modal-link-section' },
          _react2.default.createElement(
            'span',
            { className: 'rdw-embedded-modal-link-input-wrapper' },
            _react2.default.createElement('input', {
              className: 'rdw-embedded-modal-link-input',
              placeholder: translations['components.controls.embedded.enterlink'],
              onChange: this.updateValue,
              onBlur: this.updateValue,
              value: embeddedLink,
              name: 'embeddedLink'
            }),
            _react2.default.createElement(
              'span',
              { className: 'rdw-image-mandatory-sign' },
              '*'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'rdw-embedded-modal-size' },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', {
                onChange: this.updateValue,
                onBlur: this.updateValue,
                value: height,
                name: 'height',
                className: 'rdw-embedded-modal-size-input',
                placeholder: 'Height'
              }),
              _react2.default.createElement(
                'span',
                { className: 'rdw-image-mandatory-sign' },
                '*'
              )
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', {
                onChange: this.updateValue,
                onBlur: this.updateValue,
                value: width,
                name: 'width',
                className: 'rdw-embedded-modal-size-input',
                placeholder: 'Width'
              }),
              _react2.default.createElement(
                'span',
                { className: 'rdw-image-mandatory-sign' },
                '*'
              )
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-embedded-modal-btn-section' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'rdw-embedded-modal-btn',
              onClick: this.onChange,
              disabled: !embeddedLink || !height || !width
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'rdw-embedded-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          icon = _props2$config.icon,
          className = _props2$config.className,
          title = _props2$config.title,
          expanded = _props2.expanded,
          onExpandEvent = _props2.onExpandEvent,
          translations = _props2.translations;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-embedded-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-embedded-control'
        },
        _react2.default.createElement(
          _Option2.default,
          {
            className: (0, _classnames2.default)(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent,
            title: title || translations['components.controls.embedded.embedded']
          },
          _react2.default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.rendeEmbeddedLinkModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object,
  doCollapse: _propTypes2.default.func
} : {};
exports.default = LayoutComponent;
module.exports = exports['default'];