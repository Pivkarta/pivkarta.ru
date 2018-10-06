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

var _openlink = require('../../../images/openlink.svg');

var _openlink2 = _interopRequireDefault(_openlink);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function getLinkComponent(config) {
  var _class, _temp2;

  var showOpenOptionOnHover = config.showOpenOptionOnHover;
  return _temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Link, _Component);

    function Link() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Link);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        showPopOver: false
      }, _this.openLink = function () {
        var _this$props = _this.props,
            entityKey = _this$props.entityKey,
            contentState = _this$props.contentState;

        var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti.url;

        var linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
        linkTab.focus();
      }, _this.toggleShowPopOver = function () {
        var showPopOver = !_this.state.showPopOver;
        _this.setState({
          showPopOver: showPopOver
        });
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            entityKey = _props.entityKey,
            contentState = _props.contentState;

        var _contentState$getEnti2 = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti2.url,
            targetOption = _contentState$getEnti2.targetOption;

        var showPopOver = this.state.showPopOver;

        return _react2.default.createElement(
          'span',
          {
            className: 'rdw-link-decorator-wrapper',
            onMouseEnter: this.toggleShowPopOver,
            onMouseLeave: this.toggleShowPopOver
          },
          _react2.default.createElement(
            'a',
            { href: url, target: targetOption },
            children
          ),
          showPopOver && showOpenOptionOnHover ? _react2.default.createElement('img', {
            src: _openlink2.default,
            alt: '',
            onClick: this.openLink,
            className: 'rdw-link-decorator-icon'
          }) : undefined
        );
      }
    }]);
    return Link;
  }(_react.Component), _class.propTypes = {
    entityKey: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.array,
    contentState: _propTypes2.default.object
  }, _temp2;
}

exports.default = function (config) {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config)
  };
};