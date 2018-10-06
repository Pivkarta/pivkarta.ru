'use strict';

exports.__esModule = true;
exports.MultipleUploader = undefined;

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import FileInput from '../FileInput';

var _templateObject = _taggedTemplateLiteralLoose(['\n  mutation($files: [Upload!]!) {\n    multipleUpload(files: $files) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n'], ['\n  mutation($files: [Upload!]!) {\n    multipleUpload(files: $files) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactApollo = require('react-apollo');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _SingleUploader2 = require('../SingleUploader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = _extends({}, _SingleUploader2.SingleUploader.defaultProps);

Object.assign(defaultProps, {
  multiple: true
});

var MultipleUploader = exports.MultipleUploader = (_temp = _class = function (_SingleUploader) {
  _inherits(MultipleUploader, _SingleUploader);

  function MultipleUploader() {
    _classCallCheck(this, MultipleUploader);

    return _possibleConstructorReturn(this, _SingleUploader.apply(this, arguments));
  }

  MultipleUploader.prototype.upload = function upload(target) {
    var mutate = this.props.mutate;


    return target.validity.valid && mutate({
      variables: { files: target.files }
    });
  };

  return MultipleUploader;
}(_SingleUploader2.SingleUploader), _class.defaultProps = defaultProps, _temp);
exports.default = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject))(MultipleUploader);