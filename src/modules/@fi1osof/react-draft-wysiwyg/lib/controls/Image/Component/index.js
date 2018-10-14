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

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Spinner = require('../../../components/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

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
      imgSrc: '',
      dragEnter: false,
      uploadHighlighted: _this.props.config.uploadEnabled && !!_this.props.config.uploadCallback,
      showImageLoading: false,
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width,
      alt: ''
    }, _this.onDragEnter = function (event) {
      _this.stopPropagation(event);
      _this.setState({
        dragEnter: true
      });
    }, _this.onImageDrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this.setState({
        dragEnter: false
      });

      // Check if property name is files or items
      // IE uses 'files' instead of 'items'
      var data = void 0;
      var dataIsItems = void 0;
      if (event.dataTransfer.items) {
        data = event.dataTransfer.items;
        dataIsItems = true;
      } else {
        data = event.dataTransfer.files;
        dataIsItems = false;
      }
      for (var i = 0; i < data.length; i += 1) {
        if ((!dataIsItems || data[i].kind === 'file') && data[i].type.match('^image/')) {
          var file = dataIsItems ? data[i].getAsFile() : data[i];
          _this.uploadImage(file);
        }
      }
    }, _this.showImageUploadOption = function () {
      _this.setState({
        uploadHighlighted: true
      });
    }, _this.addImageFromState = function () {
      var _this$state = _this.state,
          imgSrc = _this$state.imgSrc,
          alt = _this$state.alt;
      var _this$state2 = _this.state,
          height = _this$state2.height,
          width = _this$state2.width;
      var onChange = _this.props.onChange;

      if (!isNaN(height)) {
        height += 'px';
      }
      if (!isNaN(width)) {
        width += 'px';
      }
      onChange(imgSrc, height, width, alt);
    }, _this.showImageURLOption = function () {
      _this.setState({
        uploadHighlighted: false
      });
    }, _this.toggleShowImageLoading = function () {
      var showImageLoading = !_this.state.showImageLoading;
      _this.setState({
        showImageLoading: showImageLoading
      });
    }, _this.updateValue = function (event) {
      _this.setState((0, _defineProperty3.default)({}, '' + event.target.name, event.target.value));
    }, _this.selectImage = function (event) {
      if (event.target.files && event.target.files.length > 0) {
        _this.uploadImage(event.target.files[0]);
      }
    }, _this.uploadImage = function (file) {
      _this.toggleShowImageLoading();
      var uploadCallback = _this.props.config.uploadCallback;

      uploadCallback(file).then(function (_ref2) {
        var data = _ref2.data;

        _this.setState({
          showImageLoading: false,
          dragEnter: false,
          imgSrc: data.link
        });
        _this.fileUpload = false;
      }).catch(function () {
        _this.setState({
          showImageLoading: false,
          dragEnter: false
        });
      });
    }, _this.fileUploadClick = function (event) {
      _this.fileUpload = true;
      event.stopPropagation();
    }, _this.stopPropagation = function (event) {
      if (!_this.fileUpload) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        _this.fileUpload = false;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          imgSrc: '',
          dragEnter: false,
          uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
          showImageLoading: false,
          height: this.props.config.defaultSize.height,
          width: this.props.config.defaultSize.width,
          alt: ''
        });
      } else if (props.config.uploadCallback !== this.props.config.uploadCallback || props.config.uploadEnabled !== this.props.config.uploadEnabled) {
        this.setState({
          uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback
        });
      }
    }
  }, {
    key: 'renderAddImageModal',
    value: function renderAddImageModal() {
      var _state = this.state,
          imgSrc = _state.imgSrc,
          uploadHighlighted = _state.uploadHighlighted,
          showImageLoading = _state.showImageLoading,
          dragEnter = _state.dragEnter,
          height = _state.height,
          width = _state.width,
          alt = _state.alt;
      var _props = this.props,
          _props$config = _props.config,
          popupClassName = _props$config.popupClassName,
          uploadCallback = _props$config.uploadCallback,
          uploadEnabled = _props$config.uploadEnabled,
          urlEnabled = _props$config.urlEnabled,
          previewImage = _props$config.previewImage,
          inputAccept = _props$config.inputAccept,
          altConf = _props$config.alt,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-image-modal', popupClassName),
          onClick: this.stopPropagation
        },
        _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-header' },
          uploadEnabled && uploadCallback && _react2.default.createElement(
            'span',
            {
              onClick: this.showImageUploadOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.fileUpload'],
            _react2.default.createElement('span', {
              className: (0, _classnames2.default)('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': uploadHighlighted })
            })
          ),
          urlEnabled && _react2.default.createElement(
            'span',
            {
              onClick: this.showImageURLOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.byURL'],
            _react2.default.createElement('span', {
              className: (0, _classnames2.default)('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': !uploadHighlighted })
            })
          )
        ),
        uploadHighlighted ? _react2.default.createElement(
          'div',
          { onClick: this.fileUploadClick },
          _react2.default.createElement(
            'div',
            {
              onDragEnter: this.onDragEnter,
              onDragOver: this.stopPropagation,
              onDrop: this.onImageDrop,
              className: (0, _classnames2.default)('rdw-image-modal-upload-option', { 'rdw-image-modal-upload-option-highlighted': dragEnter })
            },
            _react2.default.createElement(
              'label',
              {
                htmlFor: 'file',
                className: 'rdw-image-modal-upload-option-label'
              },
              previewImage && imgSrc ? _react2.default.createElement('img', {
                src: imgSrc,
                alt: imgSrc,
                className: 'rdw-image-modal-upload-option-image-preview'
              }) : imgSrc || translations['components.controls.image.dropFileText']
            )
          ),
          _react2.default.createElement('input', {
            type: 'file',
            id: 'file',
            accept: inputAccept,
            onChange: this.selectImage,
            className: 'rdw-image-modal-upload-option-input'
          })
        ) : _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-url-section' },
          _react2.default.createElement('input', {
            className: 'rdw-image-modal-url-input',
            placeholder: translations['components.controls.image.enterlink'],
            name: 'imgSrc',
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: imgSrc
          }),
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          )
        ),
        altConf.present && _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-size' },
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-modal-alt-lbl' },
            'Alt Text'
          ),
          _react2.default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: alt,
            name: 'alt',
            className: 'rdw-image-modal-alt-input',
            placeholder: 'alt'
          }),
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            altConf.mandatory && '*'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-size' },
          '\u2195\xA0',
          _react2.default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: height,
            name: 'height',
            className: 'rdw-image-modal-size-input',
            placeholder: 'Height'
          }),
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          ),
          '\xA0\u2194\xA0',
          _react2.default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: width,
            name: 'width',
            className: 'rdw-image-modal-size-input',
            placeholder: 'Width'
          }),
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-image-modal-btn-section' },
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: this.addImageFromState,
              disabled: !imgSrc || !height || !width || altConf.mandatory && !alt
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        ),
        showImageLoading ? _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-spinner' },
          _react2.default.createElement(_Spinner2.default, null)
        ) : undefined
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
          className: 'rdw-image-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-image-control'
        },
        _react2.default.createElement(
          _Option2.default,
          {
            className: (0, _classnames2.default)(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent,
            title: title || translations['components.controls.image.image']
          },
          _react2.default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderAddImageModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
exports.default = LayoutComponent;
module.exports = exports['default'];