
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

import CloseIcon from 'material-ui-icons/Clear';
import { graphql } from 'react-apollo';

import {
	place,
} from 'src/modules/query';

import Image from 'src/modules/ui/Image';

// import Stars from 'modules/src/modules/ReactCMS/components/Pages/Companies/Company/fields/Rating/Stars';

export class CompanyMiniCart extends Component{

	static propTypes = {
		data: PropTypes.object,
		ratings: PropTypes.object,
	};

	static defaultProps = {
		imageType: "marker_thumb",
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
			data,
			...other
		} = this.props;

		const {
			object: item,
		} = data;

		if(!item){
			return null;
		}		

		const {
			name,
			alias,
			uri,
			image,
			// imageFormats,
			// ratingAvg,
			_isDirty,
		} = item;




		// const link = `/bani/${alias}/`;
		// const link = `/${uri}`;
		const link = uri;

		return <div
			{...other}
		>
			<div
				style={{
					marginBottom: 5,
					fontSize: "14px",
					padding: "2px",
					background: "#3caae8",
				}}
			>
				
				<Grid
					container
					align="flex-start"
					spacing={0}
				>
					
					<Grid
						item
						xs
					>
						<Link
							to={link}
							href={link}
							style={{
								color: "#ffffff",
							}}
						>
							{name}
						</Link>
					</Grid>
					
					{/* {closeHandler
						?
						<Grid
							item
						>
							<IconButton
								onClick={closeHandler}
								style={{
									width: 24,
									height: 24,
									padding: 3,
									marginTop: -6,
								}}
							>
								<CloseIcon />
							</IconButton>
						</Grid>
						:
						null
					} */}

				</Grid>

				{/*ratings !== null && <Stars 
					value={parseFloat(rating) || 0}
				/> || null*/}
				
			</div>

			{image
				?
				<Link
					to={link}
					href={link}
				>
					<Image 
						src={image}
						type="slider_thumb"
						style={{
							width: "100%",
						}}
					/>
				</Link>
				:
				null
			}
		</div>
	}
}

export default graphql(place)(CompanyMiniCart);