'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mention = (_temp = _class = function Mention(className) {
  (0, _classCallCheck3.default)(this, Mention);

  _initialiseProps.call(this);

  this.className = className;
}, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getMentionComponent = function () {
    var className = _this.className;
    var MentionComponent = function MentionComponent(_ref) {
      var entityKey = _ref.entityKey,
          children = _ref.children,
          contentState = _ref.contentState;

      var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
          url = _contentState$getEnti.url,
          value = _contentState$getEnti.value;

      return _react2.default.createElement(
        'a',
        { href: url || value, className: (0, _classnames2.default)('rdw-mention-link', className) },
        children
      );
    };
    MentionComponent.propTypes = process.env.NODE_ENV !== "production" ? {
      entityKey: _propTypes2.default.number,
      children: _propTypes2.default.array,
      contentState: _propTypes2.default.object
    } : {};
    return MentionComponent;
  };

  this.getMentionDecorator = function () {
    return {
      strategy: _this.findMentionEntities,
      component: _this.getMentionComponent()
    };
  };
}, _temp);


Mention.prototype.findMentionEntities = function (contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
  }, callback);
};

exports.default = Mention;