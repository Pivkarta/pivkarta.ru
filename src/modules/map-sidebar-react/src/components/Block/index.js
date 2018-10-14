

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class SideBarBlock extends Component{

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

		return <div
			className={[className, "SideBar--block"].join(" ")}
			{...other}
		>
			{children}
		</div>
	}
}

