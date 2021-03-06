'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleMapReactControl = function (_React$Component) {
	_inherits(GoogleMapReactControl, _React$Component);

	function GoogleMapReactControl(props) {
		_classCallCheck(this, GoogleMapReactControl);

		var _this = _possibleConstructorReturn(this, (GoogleMapReactControl.__proto__ || Object.getPrototypeOf(GoogleMapReactControl)).call(this, props));

		var ready = props.ready;


		_this.state = {
			ready: ready
		};

		// this._reactInternalInstance = {};

		return _this;
	} // eslint-disable-line react/prefer-stateless-function

	_createClass(GoogleMapReactControl, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    map = _props.map,
			    maps = _props.maps,
			    position = _props.position;


			var renderedComponent = this && this._reactInternalInstance && this._reactInternalInstance._renderedComponent || undefined;

			var pos = position && maps.ControlPosition && maps.ControlPosition[position] && map.controls && map.controls[maps.ControlPosition[position]];

			if (pos && renderedComponent) {

				pos.push(renderedComponent._hostNode);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    propsReady = _props2.ready,
			    _props2$style = _props2.style,
			    style = _props2$style === undefined ? {} : _props2$style,
			    maps = _props2.maps,
			    map = _props2.map,
			    position = _props2.position,
			    other = _objectWithoutProperties(_props2, ['ready', 'style', 'maps', 'map', 'position']);

			var ready = this.state.ready;


			return _react2.default.createElement('div', _extends({
				style: Object.assign({
					position: "absolute",
					display: !ready ? "none" : undefined
				}, style)
			}, other));
		}
	}]);

	return GoogleMapReactControl;
}(_react2.default.Component);

GoogleMapReactControl.defaultProps = {
	ready: true
};
exports.default = GoogleMapReactControl;