
import '../../styles/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Control from 'src/modules/google-map-react-control/';

export default class MapSideBar extends Component{

	static propTypes = {

	};

	
	static defaultProps = {

	};

	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {

		};
	}


	componentWillMount(){
	
	}


	componentDidMount(){

	}

	
	render(){

		const {
			className,
			children,
			...other
		} = this.props;

		// return <Control
		// 	className={[className, "MapSideBar--root"].join(" ")}
		// 	{...other}
		// >
			
		// 	{children}

		// </Control>;

		return <div
			className={[className, "MapSideBar--root"].join(" ")}
			{...other}
		>
			
			{children}

		</div>;
	}
}

