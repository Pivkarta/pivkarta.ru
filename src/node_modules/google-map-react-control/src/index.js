import React from 'react';
import PropTypes from 'prop-types';

import Portal from 'material-ui/Portal';

let Props = {
	map: {
		controls: {},
	},
	maps: {
		ControlPosition: {},
	},
	position: "",
};

let State = {
};

let _reactInternalInstance = {
	_renderedComponent: {
		_hostNode: {

		},
	},
};

export default class GoogleMapReactControl extends React.Component { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		map: PropTypes.object.isRequired,
		maps: PropTypes.object.isRequired,
		containerProps: PropTypes.object,
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
	
	static defaultProps = {
		ready: true,
	};

	state = State;

	_reactInternalInstance = _reactInternalInstance;

	constructor(props) {

		super(props);

		const {
			ready,
		} = props;

		this.state = {
			ready,
		};

		// this._reactInternalInstance = {};

	}


	componentWillMount(){

		const {
			map,
			maps,
			position,
			containerProps,
		} = this.props;

		if(!maps || !map){
			return false;
		}

		let div = document.createElement("div");

		// div.style="color:red;";

		Object.assign(div, containerProps);

		const pos = position && maps.ControlPosition && maps.ControlPosition[position] && map.controls && map.controls[maps.ControlPosition[position]];

		if (pos) {

			pos.push(div);

		}

		Object.assign(this.state, {
			container: div,
		});
	}


	// componentDidMount__() {

	// 	const {
	// 		map,
	// 		maps,
	// 		position,
	// 	} = this.props;

	// 	const renderedComponent = this && this._reactInternalInstance && this._reactInternalInstance._renderedComponent || undefined;

	// 	const pos = position && maps.ControlPosition && maps.ControlPosition[position] && map.controls && map.controls[maps.ControlPosition[position]];

	// 	if (pos && renderedComponent) {

	// 		pos.push(renderedComponent._hostNode);

	// 	}

	// }
	

	render() {

		const {
			ready: propsReady,
			style = {},
			maps,
			map,
			position,
			containerProps,
			children,
			...other
		} = this.props;

		const {
			ready,
			container,
		} = this.state;

		if(!container){
			return null;
		}

		return (<Portal
			container={container}
		>
			<div
				style={Object.assign({
					// position: "absolute",
					// display: !ready ? "none" : undefined,
				}, style)}
			>
				{children}
			</div>
		</Portal>);

	}
}
