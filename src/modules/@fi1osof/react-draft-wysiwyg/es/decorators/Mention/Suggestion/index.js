'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _addMention = require('../addMention');

var _addMention2 = _interopRequireDefault(_addMention);

var _keyDown = require('../../../event-handler/keyDown');

var _keyDown2 = _interopRequireDefault(_keyDown);

var _suggestions = require('../../../event-handler/suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestion = (_temp = _class = function Suggestion(config) {
  (0, _classCallCheck3.default)(this, Suggestion);

  _initialiseProps.call(this);

  var separator = config.separator,
      trigger = config.trigger,
      getSuggestions = config.getSuggestions,
      onChange = config.onChange,
      getEditorState = config.getEditorState,
      getWrapperRef = config.getWrapperRef,
      caseSensitive = config.caseSensitive,
      dropdownClassName = config.dropdownClassName,
      optionClassName = config.optionClassName,
      modalHandler = config.modalHandler;

  this.config = {
    separator: separator,
    trigger: trigger,
    getSuggestions: getSuggestions,
    onChange: onChange,
    getEditorState: getEditorState,
    getWrapperRef: getWrapperRef,
    caseSensitive: caseSensitive,
    dropdownClassName: dropdownClassName,
    optionClassName: optionClassName,
    modalHandler: modalHandler
  };
}, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.findSuggestionEntities = function (contentBlock, callback) {
    if (_this.config.getEditorState()) {
      var _config = _this.config,
          separator = _config.separator,
          trigger = _config.trigger,
          getSuggestions = _config.getSuggestions,
          getEditorState = _config.getEditorState;

      var selection = getEditorState().getSelection();
      if (selection.get('anchorKey') === contentBlock.get('key') && selection.get('anchorKey') === selection.get('focusKey')) {
        var text = contentBlock.getText();
        text = text.substr(0, selection.get('focusOffset') === text.length - 1 ? text.length : selection.get('focusOffset') + 1);
        var index = text.lastIndexOf(separator + trigger);
        var preText = separator + trigger;
        if ((index === undefined || index < 0) && text[0] === trigger) {
          index = 0;
          preText = trigger;
        }
        if (index >= 0) {
          var mentionText = text.substr(index + preText.length, text.length);
          var suggestionPresent = getSuggestions().some(function (suggestion) {
            if (suggestion.value) {
              if (_this.config.caseSensitive) {
                return suggestion.value.indexOf(mentionText) >= 0;
              }
              return suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >= 0;
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index === 0 ? 0 : index + 1, text.length);
          }
        }
      }
    }
  };

  this.getSuggestionComponent = getSuggestionComponent.bind(this);

  this.getSuggestionDecorator = function () {
    return {
      strategy: _this.findSuggestionEntities,
      component: _this.getSuggestionComponent()
    };
  };
}, _temp);


function getSuggestionComponent() {
  var _class2, _temp3;

  var config = this.config;

  return _temp3 = _class2 = function (_Component) {
    (0, _inherits3.default)(SuggestionComponent, _Component);

    function SuggestionComponent() {
      var _ref;

      var _temp2, _this2, _ret;

      (0, _classCallCheck3.default)(this, SuggestionComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = SuggestionComponent.__proto__ || (0, _getPrototypeOf2.default)(SuggestionComponent)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
        style: { left: 15 },
        activeOption: -1,
        showSuggestions: true
      }, _this2.onEditorKeyDown = function (event) {
        var activeOption = _this2.state.activeOption;

        var newState = {};
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (activeOption === _this2.filteredSuggestions.length - 1) {
            newState.activeOption = 0;
          } else {
            newState.activeOption = activeOption + 1;
          }
        } else if (event.key === 'ArrowUp') {
          if (activeOption <= 0) {
            newState.activeOption = _this2.filteredSuggestions.length - 1;
          } else {
            newState.activeOption = activeOption - 1;
          }
        } else if (event.key === 'Escape') {
          newState.showSuggestions = false;
          _suggestions2.default.close();
        } else if (event.key === 'Enter') {
          _this2.addMention();
        }
        _this2.setState(newState);
      }, _this2.onOptionMouseEnter = function (event) {
        var index = event.target.getAttribute('data-index');
        _this2.setState({
          activeOption: index
        });
      }, _this2.onOptionMouseLeave = function () {
        _this2.setState({
          activeOption: -1
        });
      }, _this2.setSuggestionReference = function (ref) {
        _this2.suggestion = ref;
      }, _this2.setDropdownReference = function (ref) {
        _this2.dropdown = ref;
      }, _this2.closeSuggestionDropdown = function () {
        _this2.setState({
          showSuggestions: false
        });
      }, _this2.filteredSuggestions = [], _this2.filterSuggestions = function (props) {
        var mentionText = props.children[0].props.text.substr(1);
        var suggestions = config.getSuggestions();
        _this2.filteredSuggestions = suggestions && suggestions.filter(function (suggestion) {
          if (!mentionText || mentionText.length === 0) {
            return true;
          }
          if (config.caseSensitive) {
            return suggestion.value.indexOf(mentionText) >= 0;
          }
          return suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >= 0;
        });
      }, _this2.addMention = function () {
        var activeOption = _this2.state.activeOption;

        var editorState = config.getEditorState();
        var onChange = config.onChange,
            separator = config.separator,
            trigger = config.trigger;

        var selectedMention = _this2.filteredSuggestions[activeOption];
        if (selectedMention) {
          (0, _addMention2.default)(editorState, onChange, separator, trigger, selectedMention);
        }
      }, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret);
    }

    (0, _createClass3.default)(SuggestionComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var editorRect = config.getWrapperRef().getBoundingClientRect();
        var suggestionRect = this.suggestion.getBoundingClientRect();
        var dropdownRect = this.dropdown.getBoundingClientRect();
        var left = void 0;
        var right = void 0;
        var bottom = void 0;
        if (editorRect.width < suggestionRect.left - editorRect.left + dropdownRect.width) {
          right = 15;
        } else {
          left = 15;
        }
        if (editorRect.bottom < dropdownRect.bottom) {
          bottom = 0;
        }
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          style: { left: left, right: right, bottom: bottom }
        });
        _keyDown2.default.registerCallBack(this.onEditorKeyDown);
        _suggestions2.default.open();
        config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
        this.filterSuggestions(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if (this.props.children !== props.children) {
          this.filterSuggestions(props);
          this.setState({
            showSuggestions: true
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _keyDown2.default.deregisterCallBack(this.onEditorKeyDown);
        _suggestions2.default.close();
        config.modalHandler.removeSuggestionCallback();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var children = this.props.children;
        var _state = this.state,
            activeOption = _state.activeOption,
            showSuggestions = _state.showSuggestions;
        var dropdownClassName = config.dropdownClassName,
            optionClassName = config.optionClassName;

        return _react2.default.createElement(
          'span',
          {
            className: 'rdw-suggestion-wrapper',
            ref: this.setSuggestionReference,
            onClick: config.modalHandler.onSuggestionClick,
            'aria-haspopup': 'true',
            'aria-label': 'rdw-suggestion-popup'
          },
          _react2.default.createElement(
            'span',
            null,
            children
          ),
          showSuggestions && _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('rdw-suggestion-dropdown', dropdownClassName),
              contentEditable: 'false',
              suppressContentEditableWarning: true,
              style: this.state.style,
              ref: this.setDropdownReference
            },
            this.filteredSuggestions.map(function (suggestion, index) {
              return _react2.default.createElement(
                'span',
                {
                  key: index,
                  spellCheck: false,
                  onClick: _this3.addMention,
                  'data-index': index,
                  onMouseEnter: _this3.onOptionMouseEnter,
                  onMouseLeave: _this3.onOptionMouseLeave,
                  className: (0, _classnames2.default)('rdw-suggestion-option', optionClassName, { 'rdw-suggestion-option-active': index === activeOption })
                },
                suggestion.text
              );
            })
          )
        );
      }
    }]);
    return SuggestionComponent;
  }(_react.Component), _class2.propTypes = {
    children: _propTypes2.default.array
  }, _temp3;
}

exports.default = Suggestion;