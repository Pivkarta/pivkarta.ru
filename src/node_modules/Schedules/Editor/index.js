
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ScheduleType from './Type';

export default class ScheduleEditorField extends Component {

	static propTypes = {

	};

	static contextTypes = {

	};

	constructor(props) {

		super(props);

		this.state = {
			tabIndex: 0,
		};
	};


	handleTabIndexChange = (event, tabIndex) => {
		this.setState({ tabIndex });
	};


	onScheduleChange(value) {

		let data = {};



		// data[field] = value;

		this.onChange(value);

	};


	onChange(value) {

		// const {
		// 	target: {
		// 		name,
		// 		value,
		// 	},
		// } = event;

		// let data = {};

		// data[name] = value;

		const {
			onChange,
		} = this.props;

		onChange && onChange(value);

	};


	render() {

		const {
			// onFocus,
			onChange,
			...other
		} = this.props;

		return <ScheduleType
			onChange={(days) => {
				this.onScheduleChange(days);
			}}
			{...other}
		/>;
	}
}
