'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../components/Dropdown');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutComponent = function (_Component) {
  (0, _inherits3.default)(LayoutComponent, _Component);

  function LayoutComponent(props) {
    (0, _classCallCheck3.default)(this, LayoutComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LayoutComponent.__proto__ || (0, _getPrototypeOf2.default)(LayoutComponent)).call(this, props));

    _this.getBlockTypes = function (translations) {
      return [{ label: 'Normal', displayName: translations['components.controls.blocktype.normal'] }, { label: 'H1', displayName: translations['components.controls.blocktype.h1'] }, { label: 'H2', displayName: translations['components.controls.blocktype.h2'] }, { label: 'H3', displayName: translations['components.controls.blocktype.h3'] }, { label: 'H4', displayName: translations['components.controls.blocktype.h4'] }, { label: 'H5', displayName: translations['components.controls.blocktype.h5'] }, { label: 'H6', displayName: translations['components.controls.blocktype.h6'] }, { label: 'Blockquote', displayName: translations['components.controls.blocktype.blockquote'] }, { label: 'Code', displayName: translations['components.controls.blocktype.code'] }];
    };

    _this.state = {
      blockTypes: _this.getBlockTypes(props.translations)
    };
    return _this;
  }

  (0, _createClass3.default)(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (this.props.translations !== properties.translations) {
        this.setState({
          blockTypes: this.getBlockTypes(properties.translations)
        });
      }
    }
  }, {
    key: 'renderFlat',
    value: function renderFlat(blocks) {
      var _props = this.props,
          className = _props.config.className,
          onChange = _props.onChange,
          blockType = _props.currentState.blockType;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-inline-wrapper', className) },
        blocks.map(function (block, index) {
          return _react2.default.createElement(
            _Option2.default,
            {
              key: index,
              value: block.label,
              active: blockType === block.label,
              onClick: onChange
            },
            block.displayName
          );
        })
      );
    }
  }, {
    key: 'renderInDropdown',
    value: function renderInDropdown(blocks) {
      var _props2 = this.props,
          _props2$config = _props2.config,
          className = _props2$config.className,
          dropdownClassName = _props2$config.dropdownClassName,
          title = _props2$config.title,
          blockType = _props2.currentState.blockType,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var blockTypes = this.state.blockTypes;

      var currentBlockData = blockTypes.filter(function (blk) {
        return blk.label === blockType;
      });
      var currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
      return _react2.default.createElement(
        'div',
        { className: 'rdw-block-wrapper', 'aria-label': 'rdw-block-control' },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('rdw-block-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.blocktype.blocktype']
          },
          _react2.default.createElement(
            'span',
            null,
            currentLabel || translations['components.controls.blocktype.blocktype']
          ),
          blocks.map(function (block, index) {
            return _react2.default.createElement(
              _Dropdown.DropdownOption,
              {
                active: blockType === block.label,
                value: block.label,
                key: index
              },
              block.displayName
            );
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;
      var inDropdown = config.inDropdown;
      var blockTypes = this.state.blockTypes;

      var blocks = blockTypes.filter(function (_ref) {
        var label = _ref.label;
        return config.options.includes(label);
      });
      return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
    }
  }]);
  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
} : {};
exports.default = LayoutComponent;