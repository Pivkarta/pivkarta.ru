var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  mutation($files: [Upload!]!) {\n    multipleUpload(files: $files) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n'], ['\n  mutation($files: [Upload!]!) {\n    multipleUpload(files: $files) {\n      id\n      filename\n      encoding\n      mimetype\n      path\n    }\n  }\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

// import FileInput from '../FileInput';

import { SingleUploader } from '../SingleUploader';

var defaultProps = _extends({}, SingleUploader.defaultProps);

Object.assign(defaultProps, {
  multiple: true
});

export var MultipleUploader = (_temp = _class = function (_SingleUploader) {
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
}(SingleUploader), _class.defaultProps = defaultProps, _temp);

export default graphql(gql(_templateObject))(MultipleUploader);