
import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class SiteField extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
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
			...other
		} = this.props;

		if(!item){
			return null;
		}

		const {
			site,
			tvs,
		} = item;

		const {
			approved,
		} = tvs || {};

		if(!site){
			return null;
		}

		return <a 
			href={/^http.*?:\/\//.test(site) ? site : `http://${site}`}
			target="_blank" 
			rel={approved ? "follow" : "nofollow"}
			{...other}
		>
			{site.replace(/(^http.*?:\/\/|\/+$)/g, '').replace(/^www./, '').replace(/\/.*/, "")}
		</a>
	}
}
