'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _draftjsUtils = require('draftjs-utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modals = require('../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _focus = require('../event-handler/focus');

var _focus2 = _interopRequireDefault(_focus);

var _keyDown = require('../event-handler/keyDown');

var _keyDown2 = _interopRequireDefault(_keyDown);

var _suggestions = require('../event-handler/suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

var _BlockStyle = require('../utils/BlockStyle');

var _BlockStyle2 = _interopRequireDefault(_BlockStyle);

var _toolbar = require('../utils/toolbar');

var _common = require('../utils/common');

var _handlePaste = require('../utils/handlePaste');

var _controls = require('../controls');

var _controls2 = _interopRequireDefault(_controls);

var _Link = require('../decorators/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Mention = require('../decorators/Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _HashTag = require('../decorators/HashTag');

var _HashTag2 = _interopRequireDefault(_HashTag);

var _renderer = require('../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _defaultToolbar = require('../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _i18n = require('../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

require('./styles.css');

require('../../css/Draft.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function extractInlineStyle(editorState) {
//   if (editorState) {
//     const styleList = editorState.getCurrentContent().getBlockMap().map(block => block.get('characterList')).toList().flatten();

//     // console.log("styleList", styleList);
//     // console.log("styleList characterList", editorState.getCurrentContent().getBlockMap().map(block => block.get('characterList')).toList());
//     // console.log("styleList getCurrentContent", editorState.getCurrentContent());

//     extractInlineStyle2(editorState);

//     // styleList.forEach(style => {
//     //   if (style && style.indexOf('color-') === 0) {
//     //     addToCustomStyleMap('color', 'color', style.substr(6));
//     //   } else if (style && style.indexOf('bgcolor-') === 0) {
//     //     addToCustomStyleMap('bgcolor', 'backgroundColor', style.substr(8));
//     //   } else if (style && style.indexOf('fontsize-') === 0) {
//     //     addToCustomStyleMap('fontSize', 'fontSize', +style.substr(9));
//     //   } else if (style && style.indexOf('fontfamily-') === 0) {
//     //     addToCustomStyleMap('fontFamily', 'fontFamily', style.substr(11));
//     //   }
//     // });

//     console.log("styleList getCustomStyleMap", getCustomStyleMap());
//   }
// }

var WysiwygEditor = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(WysiwygEditor, _Component);

  function WysiwygEditor(props) {
    (0, _classCallCheck3.default)(this, WysiwygEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WysiwygEditor.__proto__ || (0, _getPrototypeOf2.default)(WysiwygEditor)).call(this, props));

    _initialiseProps.call(_this);

    var toolbar = (0, _toolbar.mergeRecursive)(_defaultToolbar2.default, props.toolbar);
    _this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar: toolbar
    };
    var wrapperId = props.wrapperId ? props.wrapperId : Math.floor(Math.random() * 10000);
    _this.wrapperId = 'rdw-wrapper-' + wrapperId;
    _this.modalHandler = new _modals2.default();
    _this.focusHandler = new _focus2.default();
    _this.blockRendererFn = (0, _renderer2.default)({
      isReadOnly: _this.isReadOnly,
      isImageAlignmentEnabled: _this.isImageAlignmentEnabled,
      getEditorState: _this.getEditorState,
      onChange: _this.onChange
    }, props.customBlockRenderFunc);
    _this.editorProps = _this.filterEditorProps(props);
    _this.customStyleMap = (0, _draftjsUtils.getCustomStyleMap)();
    return _this;
  }

  (0, _createClass3.default)(WysiwygEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.compositeDecorator = this.getCompositeDecorator();
      var editorState = this.createEditorState(this.compositeDecorator);
      (0, _draftjsUtils.extractInlineStyle)(editorState);
      this.setState({
        editorState: editorState
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.modalHandler.init(this.wrapperId);
    }
    // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var newState = {};
      if (this.props.toolbar !== props.toolbar) {
        var toolbar = (0, _toolbar.mergeRecursive)(_defaultToolbar2.default, props.toolbar);
        newState.toolbar = toolbar;
      }
      if ((0, _common.hasProperty)(props, 'editorState') && this.props.editorState !== props.editorState) {
        if (props.editorState) {
          newState.editorState = _draftJs.EditorState.set(props.editorState, { decorator: this.compositeDecorator });
        } else {
          newState.editorState = _draftJs.EditorState.createEmpty(this.compositeDecorator);
        }
      } else if ((0, _common.hasProperty)(props, 'contentState') && this.props.contentState !== props.contentState) {
        if (props.contentState) {
          var newEditorState = this.changeEditorState(props.contentState);
          if (newEditorState) {
            newState.editorState = newEditorState;
          }
        } else {
          newState.editorState = _draftJs.EditorState.createEmpty(this.compositeDecorator);
        }
      }
      if (props.editorState !== this.props.editorState || props.contentState !== this.props.contentState) {
        (0, _draftjsUtils.extractInlineStyle)(newState.editorState);
      }
      this.setState(newState);
      this.editorProps = this.filterEditorProps(props);
      this.customStyleMap = (0, _draftjsUtils.getCustomStyleMap)();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          editorState = _state.editorState,
          editorFocused = _state.editorFocused,
          toolbar = _state.toolbar;
      var _props = this.props,
          locale = _props.locale,
          _props$localization = _props.localization,
          newLocale = _props$localization.locale,
          translations = _props$localization.translations,
          toolbarCustomButtons = _props.toolbarCustomButtons,
          toolbarOnFocus = _props.toolbarOnFocus,
          toolbarClassName = _props.toolbarClassName,
          toolbarHidden = _props.toolbarHidden,
          editorClassName = _props.editorClassName,
          wrapperClassName = _props.wrapperClassName,
          toolbarStyle = _props.toolbarStyle,
          editorStyle = _props.editorStyle,
          wrapperStyle = _props.wrapperStyle,
          uploadCallback = _props.uploadCallback,
          ariaLabel = _props.ariaLabel,
          readOnly = _props.readOnly;


      var controlProps = {
        modalHandler: this.modalHandler,
        editorState: editorState,
        onChange: this.onChange,
        translations: (0, _extends3.default)({}, _i18n2.default[locale || newLocale], translations)
      };
      var toolbarShow = !toolbarHidden && (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus);
      return _react2.default.createElement(
        'div',
        {
          id: this.wrapperId,
          className: (0, _classnames2.default)(wrapperClassName, 'rdw-editor-wrapper'),
          style: wrapperStyle,
          onClick: this.modalHandler.onEditorClick,
          onBlur: this.onWrapperBlur,
          'aria-label': 'rdw-wrapper'
        },
        !readOnly ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('rdw-editor-toolbar', toolbarClassName),
              style: (0, _extends3.default)({ visibility: toolbarShow ? 'visible' : 'hidden' }, toolbarStyle),
              onMouseDown: this.preventDefault,
              'aria-label': 'rdw-toolbar',
              'aria-hidden': (!editorFocused && toolbarOnFocus).toString(),
              onFocus: this.onToolbarFocus
            },
            toolbar.options.map(function (opt, index) {
              var Control = _controls2.default[opt];
              var config = toolbar[opt];
              if (opt === 'image' && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }
              return _react2.default.createElement(Control, (0, _extends3.default)({ key: index }, controlProps, { config: config }));
            }),
            toolbarCustomButtons && toolbarCustomButtons.map(function (button, index) {
              return _react2.default.cloneElement(button, (0, _extends3.default)({ key: index }, controlProps));
            })
          )
        ) : null,
        _react2.default.createElement(
          'div',
          {
            ref: this.setWrapperReference,
            className: (0, _classnames2.default)(editorClassName, 'rdw-editor-main'),
            style: editorStyle,
            onClick: this.focusEditor,
            onFocus: this.onEditorFocus,
            onBlur: this.onEditorBlur,
            onKeyDown: _keyDown2.default.onKeyDown,
            onMouseDown: this.onEditorMouseDown
          },
          _react2.default.createElement(_draftJs.Editor, (0, _extends3.default)({
            ref: this.setEditorReference,
            onTab: this.onTab,
            onUpArrow: this.onUpDownArrow,
            onDownArrow: this.onUpDownArrow,
            editorState: editorState,
            onChange: this.onChange,
            blockStyleFn: _BlockStyle2.default,
            customStyleMap: (0, _draftjsUtils.getCustomStyleMap)(),
            handleReturn: this.handleReturn,
            handlePastedText: this.handlePastedText,
            blockRendererFn: this.blockRendererFn,
            handleKeyCommand: this.handleKeyCommand,
            ariaLabel: ariaLabel || 'rdw-editor',
            blockRenderMap: _draftjsUtils.blockRenderMap
          }, this.editorProps))
        )
      );
    }
  }]);
  return WysiwygEditor;
}(_react.Component), _class.defaultProps = {
  toolbarOnFocus: false,
  toolbarHidden: false,
  stripPastedStyles: false,
  localization: { locale: 'en', translations: {} },
  customDecorators: []
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onEditorBlur = function () {
    _this2.setState({
      editorFocused: false
    });
  };

  this.onEditorFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    _this2.setState({
      editorFocused: true
    });
    var editFocused = _this2.focusHandler.isEditorFocused();
    if (onFocus && editFocused) {
      onFocus(event);
    }
  };

  this.onEditorMouseDown = function () {
    _this2.focusHandler.onEditorMouseDown();
  };

  this.onTab = function (event) {
    var onTab = _this2.props.onTab;

    if (!onTab || !onTab(event)) {
      var _editorState = (0, _draftjsUtils.changeDepth)(_this2.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (_editorState && _editorState !== _this2.state.editorState) {
        _this2.onChange(_editorState);
        event.preventDefault();
      }
    }
  };

  this.onUpDownArrow = function (event) {
    if (_suggestions2.default.isOpen()) {
      event.preventDefault();
    }
  };

  this.onToolbarFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    if (onFocus && _this2.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  this.onWrapperBlur = function (event) {
    var onBlur = _this2.props.onBlur;

    if (onBlur && _this2.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
  };

  this.onChange = function (editorState) {
    var _props2 = _this2.props,
        readOnly = _props2.readOnly,
        onEditorStateChange = _props2.onEditorStateChange;

    if (!readOnly && !((0, _draftjsUtils.getSelectedBlocksType)(editorState) === 'atomic' && editorState.getSelection().isCollapsed)) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState, _this2.props.wrapperId);
      }
      if (!(0, _common.hasProperty)(_this2.props, 'editorState')) {
        _this2.setState({ editorState: editorState }, _this2.afterChange(editorState));
      } else {
        _this2.afterChange(editorState);
      }
    }
  };

  this.setWrapperReference = function (ref) {
    _this2.wrapper = ref;
  };

  this.setEditorReference = function (ref) {
    if (_this2.props.editorRef) {
      _this2.props.editorRef(ref);
    }
    _this2.editor = ref;
  };

  this.getCompositeDecorator = function () {
    var decorators = [].concat((0, _toConsumableArray3.default)(_this2.props.customDecorators), [(0, _Link2.default)({
      showOpenOptionOnHover: _this2.state.toolbar.link.showOpenOptionOnHover
    })]);
    if (_this2.props.mention) {
      decorators.push.apply(decorators, (0, _toConsumableArray3.default)((0, _Mention2.default)((0, _extends3.default)({}, _this2.props.mention, {
        onChange: _this2.onChange,
        getEditorState: _this2.getEditorState,
        getSuggestions: _this2.getSuggestions,
        getWrapperRef: _this2.getWrapperRef,
        modalHandler: _this2.modalHandler
      }))));
    }
    if (_this2.props.hashtag) {
      decorators.push((0, _HashTag2.default)(_this2.props.hashtag));
    }
    return new _draftJs.CompositeDecorator(decorators);
  };

  this.getWrapperRef = function () {
    return _this2.wrapper;
  };

  this.getEditorState = function () {
    return _this2.state.editorState;
  };

  this.getSuggestions = function () {
    return _this2.props.mention && _this2.props.mention.suggestions;
  };

  this.afterChange = function (editorState) {
    setTimeout(function () {
      var _props3 = _this2.props,
          onChange = _props3.onChange,
          onContentStateChange = _props3.onContentStateChange;

      if (onChange) {
        onChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      }
    });
  };

  this.isReadOnly = function () {
    return _this2.props.readOnly;
  };

  this.isImageAlignmentEnabled = function () {
    return _this2.state.toolbar.image.alignmentEnabled;
  };

  this.createEditorState = function (compositeDecorator) {
    var editorState = void 0;
    if ((0, _common.hasProperty)(_this2.props, 'editorState')) {
      if (_this2.props.editorState) {
        editorState = _draftJs.EditorState.set(_this2.props.editorState, { decorator: compositeDecorator });
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'defaultEditorState')) {
      if (_this2.props.defaultEditorState) {
        editorState = _draftJs.EditorState.set(_this2.props.defaultEditorState, { decorator: compositeDecorator });
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'contentState')) {
      if (_this2.props.contentState) {
        var contentState = (0, _draftJs.convertFromRaw)(_this2.props.contentState);
        editorState = _draftJs.EditorState.createWithContent(contentState, compositeDecorator);
        editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'defaultContentState') || (0, _common.hasProperty)(_this2.props, 'initialContentState')) {
      var _contentState = _this2.props.defaultContentState || _this2.props.initialContentState;
      if (_contentState) {
        _contentState = (0, _draftJs.convertFromRaw)(_contentState);
        editorState = _draftJs.EditorState.createWithContent(_contentState, compositeDecorator);
        editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = _draftJs.EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  this.filterEditorProps = function (props) {
    return (0, _common.filter)(props, ['onChange', 'onEditorStateChange', 'onContentStateChange', 'initialContentState', 'defaultContentState', 'contentState', 'editorState', 'defaultEditorState', 'locale', 'localization', 'toolbarOnFocus', 'toolbar', 'toolbarCustomButtons', 'toolbarClassName', 'editorClassName', 'toolbarHidden', 'wrapperClassName', 'toolbarStyle', 'editorStyle', 'wrapperStyle', 'uploadCallback', 'onFocus', 'onBlur', 'onTab', 'mention', 'hashtag', 'ariaLabel', 'customBlockRenderFunc', 'customDecorators', 'handlePastedText']);
  };

  this.changeEditorState = function (contentState) {
    var newContentState = (0, _draftJs.convertFromRaw)(contentState);
    var editorState = _this2.state.editorState;

    editorState = _draftJs.EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  this.focusEditor = function () {
    setTimeout(function () {
      _this2.editor.focus();
    });
  };

  this.handleKeyCommand = function (command) {
    var _state2 = _this2.state,
        editorState = _state2.editorState,
        inline = _state2.toolbar.inline;

    if (inline && inline.options.indexOf(command) >= 0) {
      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        _this2.onChange(newState);
        return true;
      }
    }
    return false;
  };

  this.handleReturn = function (event) {
    if (_suggestions2.default.isOpen()) {
      return true;
    }
    var editorState = (0, _draftjsUtils.handleNewLine)(_this2.state.editorState, event);
    if (editorState) {
      _this2.onChange(editorState);
      return true;
    }
    return false;
  };

  this.handlePastedText = function (text, html) {
    if (_this2.props.handlePastedText) {
      return _this2.props.handlePastedText(text, html, editorState, _this2.onChange);
    }
    var editorState = _this2.state.editorState;

    return (0, _handlePaste.handlePastedText)(text, html, editorState, _this2.onChange);
  };

  this.preventDefault = function (event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') {
      _this2.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };
}, _temp);
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family

exports.default = WysiwygEditor;
WysiwygEditor.propTypes = process.env.NODE_ENV !== "production" ? {
  onChange: _propTypes2.default.func,
  onEditorStateChange: _propTypes2.default.func,
  onContentStateChange: _propTypes2.default.func,
  // initialContentState is deprecated
  initialContentState: _propTypes2.default.object,
  defaultContentState: _propTypes2.default.object,
  contentState: _propTypes2.default.object,
  editorState: _propTypes2.default.object,
  defaultEditorState: _propTypes2.default.object,
  toolbarOnFocus: _propTypes2.default.bool,
  spellCheck: _propTypes2.default.bool, // eslint-disable-line react/no-unused-prop-types
  stripPastedStyles: _propTypes2.default.bool, // eslint-disable-line react/no-unused-prop-types
  toolbar: _propTypes2.default.object,
  toolbarCustomButtons: _propTypes2.default.array,
  toolbarClassName: _propTypes2.default.string,
  toolbarHidden: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  localization: _propTypes2.default.object,
  editorClassName: _propTypes2.default.string,
  wrapperClassName: _propTypes2.default.string,
  toolbarStyle: _propTypes2.default.object,
  editorStyle: _propTypes2.default.object,
  wrapperStyle: _propTypes2.default.object,
  uploadCallback: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onTab: _propTypes2.default.func,
  mention: _propTypes2.default.object,
  hashtag: _propTypes2.default.object,
  textAlignment: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  readOnly: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number, // eslint-disable-line react/no-unused-prop-types
  placeholder: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaLabel: _propTypes2.default.string,
  ariaOwneeID: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaActiveDescendantID: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaAutoComplete: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaDescribedBy: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaExpanded: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  ariaHasPopup: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types
  customBlockRenderFunc: _propTypes2.default.func,
  wrapperId: _propTypes2.default.number,
  customDecorators: _propTypes2.default.array,
  editorRef: _propTypes2.default.func
} : {};