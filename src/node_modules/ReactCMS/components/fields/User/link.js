
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import Grid from 'material-ui/Grid';

import HumanIcon from 'material-ui-icons/PermIdentity';

import UserAvatar from './avatar';

export default class UserLink extends Component{

	static propTypes = {
		user: PropTypes.object.isRequired,
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
			user,
		} = this.props;

		if(!user){
			return null;
		}

		const {
			id,
			fullname,
			username,
			imageFormats,
			active,
			blocked,
		} = user || {};

		const info = <Grid
			container
			align="center"
			gutter={0}
		>
			<UserAvatar
				user={user} 
				style={{
					height:30,
					width:30,
					marginRight: 5,
				}}
			/> 

			{fullname || username}
		</Grid>

		return <Grid
			container
			align="center"
			gutter={0}
		>
			{active === true && blocked === false ? <Link
      	to={`/profile/show/${id}/`}
      	href={`/profile/show/${id}/`}
			>
				{info}
			</Link> : info}
		</Grid>
	}
}
