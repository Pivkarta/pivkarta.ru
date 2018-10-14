'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockStyleFn;
// The function will return block inline styles using block level meta-data
function blockStyleFn(block) {
  var blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return 'rdw-' + blockAlignment + '-aligned-block';
  }
  return '';
}
module.exports = exports['default'];