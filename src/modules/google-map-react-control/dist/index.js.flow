import React from 'react';
import PropTypes from 'prop-types';

type Props = {
	map: {
		controls: {},
	},
	maps: {
		ControlPosition: {},
	},
	position: "",
};

type State = {};

type _reactInternalInstance = {
	_renderedComponent: {
		_hostNode: {

		},
	},
};

export default class GoogleMapReactControl extends React.Component { // eslint-disable-line react/prefer-stateless-function

	state: State;

	_reactInternalInstance: _reactInternalInstance;

	static defaultProps = {
		ready: true,
	};

	constructor(props: Props) {

		super(props);

		const {
			ready,
		} = props;

		this.state = {
			ready,
		};

		// this._reactInternalInstance = {};

	}

	componentDidMount() {

		const {
			map,
			maps,
			position,
		} = this.props;

		const renderedComponent = this && this._reactInternalInstance && this._reactInternalInstance._renderedComponent || undefined;

		const pos = position && maps.ControlPosition && maps.ControlPosition[position] && map.controls && map.controls[maps.ControlPosition[position]];

		if (pos && renderedComponent) {

			pos.push(renderedComponent._hostNode);

		}

	}

	render() {

		const {
			ready: propsReady,
			style = {},
			maps,
			map,
			position,
			...other
		} = this.props;

		const {
			ready,
		} = this.state;

		return (<div
			style={Object.assign({
				position: "absolute",
				display: !ready ? "none" : undefined,
			}, style)}
			{ ...other }
		>
		</div>);

	}
}

GoogleMapReactControl.propTypes = {
	map: PropTypes.object.isRequired,
	maps: PropTypes.object.isRequired,
	position: PropTypes.oneOf([
		'LEFT_TOP',
		'LEFT_CENTER',
		'LEFT_BOTTOM',
		'TOP_LEFT',
		'TOP',
		'TOP_RIGHT',
		'CENTER_LEFT',
		'CENTER',
		'CENTER_RIGHT',
		'BOTTOM_LEFT',
		'BOTTOM',
		'BOTTOM_RIGHT',
		'RIGHT_TOP',
		'RIGHT_CENTER',
		'RIGHT_BOTTOM',
	]).isRequired,
};