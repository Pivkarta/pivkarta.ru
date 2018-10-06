'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hashtag = function Hashtag(config) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Hashtag);

  this.getHashtagComponent = function () {
    var className = _this.className;

    var HashtagComponent = function HashtagComponent(_ref) {
      var children = _ref.children;

      var text = children[0].props.text;
      return _react2.default.createElement(
        'a',
        { href: text, className: (0, _classnames2.default)('rdw-hashtag-link', className) },
        children
      );
    };
    HashtagComponent.propTypes = process.env.NODE_ENV !== "production" ? {
      children: _propTypes2.default.object
    } : {};
    return HashtagComponent;
  };

  this.findHashtagEntities = function (contentBlock, callback) {
    var text = contentBlock.getText();
    var startIndex = 0;
    var counter = 0;

    for (; text.length > 0 && startIndex >= 0;) {
      if (text[0] === _this.hashCharacter) {
        startIndex = 0;
        counter = 0;
        text = text.substr(_this.hashCharacter.length);
      } else {
        startIndex = text.indexOf(_this.separator + _this.hashCharacter);
        if (startIndex >= 0) {
          text = text.substr(startIndex + (_this.separator + _this.hashCharacter).length);
          counter += startIndex + _this.separator.length;
        }
      }
      if (startIndex >= 0) {
        var endIndex = text.indexOf(_this.separator) >= 0 ? text.indexOf(_this.separator) : text.length;
        var hashtagText = text.substr(0, endIndex);
        if (hashtagText && hashtagText.length > 0) {
          callback(counter, counter + hashtagText.length + _this.hashCharacter.length);
          counter += _this.hashCharacter.length;
        }
      }
    }
  };

  this.getHashtagDecorator = function () {
    return {
      strategy: _this.findHashtagEntities,
      component: _this.getHashtagComponent()
    };
  };

  this.className = config.className;
  this.hashCharacter = config.hashCharacter || '#';
  this.separator = config.separator || ' ';
};

var getDecorator = function getDecorator(config) {
  return new Hashtag(config).getHashtagDecorator();
};

exports.default = getDecorator;