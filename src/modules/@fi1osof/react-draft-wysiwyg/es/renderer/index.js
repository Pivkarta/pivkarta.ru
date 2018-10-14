'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Embedded = require('./Embedded');

var _Embedded2 = _interopRequireDefault(_Embedded);

var _Image = require('../renderer/Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBlockRenderFunc = function getBlockRenderFunc(config, customBlockRenderer) {
  return function (block) {
    if (typeof customBlockRenderer === 'function') {
      var renderedComponent = customBlockRenderer(block, config, config.getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      var contentState = config.getEditorState().getCurrentContent();
      var entity = contentState.getEntity(block.getEntityAt(0));
      if (entity && entity.type === 'IMAGE') {
        return {
          component: (0, _Image2.default)(config),
          editable: false
        };
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: _Embedded2.default,
          editable: false
        };
      }
    }
    return undefined;
  };
};

exports.default = getBlockRenderFunc;