import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Schedules from 'src/modules/Schedules';

export default class SchedulesBlock extends Component {

	state = {}

	render() {

		const {
			...other
		} = this.props;

		return (
			<Schedules
				{...other}
			/>
		)
	}
}
