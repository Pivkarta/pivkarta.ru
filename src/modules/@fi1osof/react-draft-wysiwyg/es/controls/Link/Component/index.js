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

var _toolbar = require('../../../utils/toolbar');

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

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
      showModal: false,
      linkTarget: '',
      linkTitle: '',
      linkTargetOption: _this.props.config.defaultTargetOption
    }, _this.removeLink = function () {
      var onChange = _this.props.onChange;

      onChange('unlink');
    }, _this.addLink = function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          linkTitle = _this$state.linkTitle,
          linkTarget = _this$state.linkTarget,
          linkTargetOption = _this$state.linkTargetOption;

      onChange('link', linkTitle, linkTarget, linkTargetOption);
    }, _this.updateValue = function (event) {
      _this.setState((0, _defineProperty3.default)({}, '' + event.target.name, event.target.value));
    }, _this.updateTargetOption = function (event) {
      _this.setState({
        linkTargetOption: event.target.checked ? '_blank' : '_self'
      });
    }, _this.hideModal = function () {
      _this.setState({
        showModal: false
      });
    }, _this.signalExpandShowModal = function () {
      var _this$props = _this.props,
          onExpandEvent = _this$props.onExpandEvent,
          _this$props$currentSt = _this$props.currentState,
          link = _this$props$currentSt.link,
          selectionText = _this$props$currentSt.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      onExpandEvent();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target || '',
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _this.forceExpandAndShowModal = function () {
      var _this$props2 = _this.props,
          doExpand = _this$props2.doExpand,
          _this$props2$currentS = _this$props2.currentState,
          link = _this$props2$currentS.link,
          selectionText = _this$props2$currentS.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      doExpand();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target,
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          showModal: false,
          linkTarget: '',
          linkTitle: '',
          linkTargetOption: this.props.config.defaultTargetOption
        });
      }
    }
  }, {
    key: 'renderAddLinkModal',
    value: function renderAddLinkModal() {
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;
      var _state = this.state,
          linkTitle = _state.linkTitle,
          linkTarget = _state.linkTarget,
          linkTargetOption = _state.linkTargetOption;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-link-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'label',
          { className: 'rdw-link-modal-label', htmlFor: 'linkTitle' },
          translations['components.controls.link.linkTitle']
        ),
        _react2.default.createElement('input', {
          id: 'linkTitle',
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTitle',
          value: linkTitle
        }),
        _react2.default.createElement(
          'label',
          { className: 'rdw-link-modal-label', htmlFor: 'linkTarget' },
          translations['components.controls.link.linkTarget']
        ),
        _react2.default.createElement('input', {
          id: 'linkTarget',
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTarget',
          value: linkTarget
        }),
        _react2.default.createElement(
          'label',
          { className: 'rdw-link-modal-target-option', htmlFor: 'openLinkInNewWindow' },
          _react2.default.createElement('input', {
            id: 'openLinkInNewWindow',
            type: 'checkbox',
            defaultChecked: linkTargetOption === '_blank',
            value: '_blank',
            onChange: this.updateTargetOption
          }),
          _react2.default.createElement(
            'span',
            null,
            translations['components.controls.link.linkTargetOption']
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-link-modal-buttonsection' },
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: this.addLink,
              disabled: !linkTarget || !linkTitle
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          link = _props2$config.link,
          unlink = _props2$config.unlink,
          className = _props2$config.className,
          currentState = _props2.currentState,
          expanded = _props2.expanded,
          translations = _props2.translations;
      var showModal = this.state.showModal;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-link-wrapper', className), 'aria-label': 'rdw-link-control' },
        options.indexOf('link') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'unordered-list-item',
            className: (0, _classnames2.default)(link.className),
            onClick: this.signalExpandShowModal,
            'aria-haspopup': 'true',
            'aria-expanded': showModal,
            title: link.title || translations['components.controls.link.link']
          },
          _react2.default.createElement('img', {
            src: link.icon,
            alt: ''
          })
        ),
        options.indexOf('unlink') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            disabled: !currentState.link,
            value: 'ordered-list-item',
            className: (0, _classnames2.default)(unlink.className),
            onClick: this.removeLink,
            title: unlink.title || translations['components.controls.link.unlink']
          },
          _react2.default.createElement('img', {
            src: unlink.icon,
            alt: ''
          })
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props3 = this.props,
          expanded = _props3.expanded,
          onExpandEvent = _props3.onExpandEvent,
          doCollapse = _props3.doCollapse,
          doExpand = _props3.doExpand,
          onChange = _props3.onChange,
          config = _props3.config,
          currentState = _props3.currentState,
          translations = _props3.translations;
      var options = config.options,
          link = config.link,
          unlink = config.unlink,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;
      var showModal = this.state.showModal;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-link-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-link-control',
          'aria-expanded': expanded,
          title: title
        },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('rdw-link-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded && !showModal,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent
          },
          _react2.default.createElement('img', {
            src: (0, _toolbar.getFirstIcon)(config),
            alt: ''
          }),
          options.indexOf('link') >= 0 && _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              onClick: this.forceExpandAndShowModal,
              className: (0, _classnames2.default)('rdw-link-dropdownoption', link.className),
              title: link.title || translations['components.controls.link.link']
            },
            _react2.default.createElement('img', {
              src: link.icon,
              alt: ''
            })
          ),
          options.indexOf('unlink') >= 0 && _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              onClick: this.removeLink,
              disabled: !currentState.link,
              className: (0, _classnames2.default)('rdw-link-dropdownoption', unlink.className),
              title: unlink.title || translations['components.controls.link.unlink']
            },
            _react2.default.createElement('img', {
              src: unlink.icon,
              alt: ''
            })
          )
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
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

LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
exports.default = LayoutComponent;