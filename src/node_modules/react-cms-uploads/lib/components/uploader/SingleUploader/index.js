'use strict';

exports.__esModule = true;
exports.SingleUploader = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  mutation($file: Upload!) {\n    singleUpload(file: $file) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n'], ['\n  mutation($file: Upload!) {\n    singleUpload(file: $file) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactApollo = require('react-apollo');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _FileInput = require('../FileInput');

var _FileInput2 = _interopRequireDefault(_FileInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleUploader = exports.SingleUploader = (_temp = _class = function (_Component) {
  _inherits(SingleUploader, _Component);

  function SingleUploader() {
    _classCallCheck(this, SingleUploader);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SingleUploader.prototype.handleChange = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
      var target = _ref2.target;
      var result, onUpload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.upload(target);

            case 2:
              result = _context.sent;
              onUpload = this.props.onUpload;


              if (onUpload) {
                onUpload(result);
              }

              return _context.abrupt('return', result);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function handleChange(_x) {
      return _ref.apply(this, arguments);
    }

    return handleChange;
  }();

  SingleUploader.prototype.upload = function upload(target) {
    var _props = this.props,
        mutate = _props.mutate,
        onUpload = _props.onUpload;


    return target.validity.valid && mutate({
      variables: { file: target.files[0] }
    });
  };

  SingleUploader.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        mutate = _props2.mutate,
        multiple = _props2.multiple,
        onUpload = _props2.onUpload,
        FileInput = _props2.FileInput,
        other = _objectWithoutProperties(_props2, ['mutate', 'multiple', 'onUpload', 'FileInput']);

    return _react2.default.createElement(FileInput, _extends({
      multiple: multiple,
      onChange: function onChange(event) {
        return _this2.handleChange(event);
      }
    }, other));
  };

  return SingleUploader;
}(_react.Component), _class.defaultProps = {
  FileInput: _FileInput2.default,
  multiple: false
}, _temp);

// const SingleUploader = ({ mutate }) => {

// }

SingleUploader.propTypes = process.env.NODE_ENV !== "production" ? {
  mutate: _propTypes2.default.func.isRequired,
  FileInput: _propTypes2.default.func.isRequired,
  multiple: _propTypes2.default.bool.isRequired,
  onUpload: _propTypes2.default.func
} : {};
exports.default = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject))(SingleUploader);