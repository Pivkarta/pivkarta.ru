'use strict';

exports.__esModule = true;
exports.MultiUploader = exports.SingleUploader = exports.FileInput = undefined;

var _FileInput = require('./components/uploader/FileInput');

var _FileInput2 = _interopRequireDefault(_FileInput);

var _SingleUploader = require('./components/uploader/SingleUploader');

var _SingleUploader2 = _interopRequireDefault(_SingleUploader);

var _MultiUploader = require('./components/uploader/MultiUploader');

var _MultiUploader2 = _interopRequireDefault(_MultiUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.FileInput = _FileInput2.default;
exports.SingleUploader = _SingleUploader2.default;
exports.MultiUploader = _MultiUploader2.default;
exports.default = _SingleUploader2.default;