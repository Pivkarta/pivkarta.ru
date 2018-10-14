'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Embed = function Embed(_ref) {
  var block = _ref.block,
      contentState = _ref.contentState;

  var entity = contentState.getEntity(block.getEntityAt(0));

  var _entity$getData = entity.getData(),
      src = _entity$getData.src,
      height = _entity$getData.height,
      width = _entity$getData.width;

  return _react2.default.createElement('iframe', { height: height, width: width, src: src, frameBorder: '0', allowFullScreen: true, title: 'Wysiwyg Embedded Content' });
};

Embed.propTypes = process.env.NODE_ENV !== "production" ? {
  block: _propTypes2.default.object,
  contentState: _propTypes2.default.object
} : {};

exports.default = Embed;
module.exports = exports['default'];