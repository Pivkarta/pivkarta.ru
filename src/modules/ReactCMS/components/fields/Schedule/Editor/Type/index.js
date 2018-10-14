
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactSchedule from 'src/modules/react-schedule/src/';
import 'src/modules/react-schedule/src/styles/styles.less';

import Schedule from 'modules/src/modules/ReactCMS/components/fields/Schedule';

export default class ScheduleEditorTypeField extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		field: PropTypes.string.isRequired,
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			item,
			field,
			...other
		} = this.props;

		if(!item || !field){
			return null;
		}

		const schedule = item[field];

		return <div>
			
			{/*<Schedule 
				item={item}
				field={field}
			/>*/}

			<ReactSchedule 
				days={schedule || []}
				{...other}
			/>

		</div>;
	}
}
