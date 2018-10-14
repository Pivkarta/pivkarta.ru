import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SchedulesEditor from 'src/modules/Schedules/Editor';

export default class SchedulesEditorBlock extends Component {

	// static propTypes = {
	// 	prop: PropTypes
	// }

	state = {}

	render() {

		const {
			...other
		} = this.props;

		return (
			<SchedulesEditor
				{...other}
			/>
		)
	}
}
