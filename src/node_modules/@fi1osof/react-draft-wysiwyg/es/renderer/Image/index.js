'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getImageComponent = function getImageComponent(config) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Image, _Component);

    function Image() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Image);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        hovered: false
      }, _this.setEntityAlignmentLeft = function () {
        _this.setEntityAlignment('left');
      }, _this.setEntityAlignmentRight = function () {
        _this.setEntityAlignment('right');
      }, _this.setEntityAlignmentCenter = function () {
        _this.setEntityAlignment('none');
      }, _this.setEntityAlignment = function (alignment) {
        var _this$props = _this.props,
            block = _this$props.block,
            contentState = _this$props.contentState;

        var entityKey = block.getEntityAt(0);
        contentState.mergeEntityData(entityKey, { alignment: alignment });
        config.onChange(_draftJs.EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
        _this.setState({
          dummy: true
        });
      }, _this.toggleHovered = function () {
        var hovered = !_this.state.hovered;
        _this.setState({
          hovered: hovered
        });
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Image, [{
      key: 'renderAlignmentOptions',
      value: function renderAlignmentOptions(alignment) {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('rdw-image-alignment-options-popup', {
              'rdw-image-alignment-options-popup-right': alignment === 'right'
            })
          },
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentLeft,
              className: 'rdw-image-alignment-option'
            },
            'L'
          ),
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentCenter,
              className: 'rdw-image-alignment-option'
            },
            'C'
          ),
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentRight,
              className: 'rdw-image-alignment-option'
            },
            'R'
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            block = _props.block,
            contentState = _props.contentState;
        var hovered = this.state.hovered;
        var isReadOnly = config.isReadOnly,
            isImageAlignmentEnabled = config.isImageAlignmentEnabled;

        var entity = contentState.getEntity(block.getEntityAt(0));

        var _entity$getData = entity.getData(),
            src = _entity$getData.src,
            alignment = _entity$getData.alignment,
            height = _entity$getData.height,
            width = _entity$getData.width,
            alt = _entity$getData.alt;

        return _react2.default.createElement(
          'span',
          {
            onMouseEnter: this.toggleHovered,
            onMouseLeave: this.toggleHovered,
            className: (0, _classnames2.default)('rdw-image-alignment', {
              'rdw-image-left': alignment === 'left',
              'rdw-image-right': alignment === 'right',
              'rdw-image-center': !alignment || alignment === 'none'
            })
          },
          _react2.default.createElement(
            'span',
            { className: 'rdw-image-imagewrapper' },
            _react2.default.createElement('img', {
              src: src,
              alt: alt,
              style: {
                height: height,
                width: width
              }
            }),
            !isReadOnly() && hovered && isImageAlignmentEnabled() ? this.renderAlignmentOptions(alignment) : undefined
          )
        );
      }
    }]);
    return Image;
  }(_react.Component), _class.propTypes = {
    block: _propTypes2.default.object,
    contentState: _propTypes2.default.object
  }, _temp2;
};

exports.default = getImageComponent;