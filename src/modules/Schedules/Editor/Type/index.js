
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactSchedule from 'src/modules/react-schedule/src/';
// import 'src/modules/react-schedule/src/styles/styles.less';

export default class ScheduleEditorTypeField extends Component{

	static propTypes = {
	};

	static contextTypes = {

	};


	
	render(){

		const {
			value,
			...other
		} = this.props;

		return <div>

			<ReactSchedule 
				days={value || []}
				{...other}
			/>

		</div>;
	}
}
