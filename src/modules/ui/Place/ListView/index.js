import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlaceView from "../ObjectView";

import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';

import PlaceImage from 'src/modules/ui/Image/Place';

export default class PlaceListView extends PlaceView {


	renderHeader() {

		return null;
	}



	setPageMeta() {


		// let title;


		// const {
		//   type,
		// } = this.props;

		// switch (type) {

		//   case "shop":
		//     title = "Магазины разливного, крафтового и серийного пива";
		//     break;

		//   case "bar":
		//     title = "Бары, пабы, спорт-бары, пивные рестораны";
		//     break;

		//   case "brewery":
		//     title = "Пивоварни разливного, крафтового пива";
		//     break;

		//   default: title = "Все Бары, пабы, спорт-бары, пивные рестораны";
		// }




		// return super.setPageMeta({
		//   title,
		// });

	}


	renderDefaultView___() {

		const object = this.getObjectWithMutations();

		const {
			place_id,
			name,
			url_name,
			uri,
			image,
			address,
		} = object;


		let url = uri || `/place/${place_id}/${url_name}`;

		return <div
			style={{
				height: "100%",
				paddingBottom: 20,
			}}
		>
			<Link
				to={url}
				title={name}
				style={{
					height: "100%",
					display: "flex",
					// border: "1px solid",
					flexDirection: "column",
					flexBasis: "100%",
				}}
			>
				<Typography
					variant="title"
				>
					{name}
				</Typography>

				<Typography
					variant="subheading"
					style={{
						flexGrow: 1,
						marginBottom: 3,
					}}
				>
					{address}
				</Typography>

				<PlaceImage
					src={image}
					type="slider_thumb"
					style={{
						width: "100%",
					}}
					alt={name}
					title={name}
				// is_bar={is_bar}
				// is_shop={is_shop}
				// is_brewery={is_brewery}
				/>

			</Link>
		</div>

	}


	renderDefaultView() {

		const object = this.getObjectWithMutations();

		const {
			place_id,
			name,
			url_name,
			uri,
			image,
			address,
			is_bar,
			is_shop,
			is_brewery,
		} = object;


		let url = uri || `/place/${place_id}/${url_name}`;

		return <Link
			to={url}
			title={name}
			style={{
				height: "100%",
				display: "flex",
				// border: "1px solid",
				flexDirection: "column",
				flexBasis: "100%",
			}}
			className="barblock__card"
		>
			<PlaceImage
				src={image}
				type="place_avatar"
				alt={name}
				title={name}
				style={{
					width: "100%",
				}}
			/>
			<div
				className="barblock__nameblock"
				style={{
					flexGrow: 1,
				}}
			>
				<div className="barblock__name">
					{name}
				</div>
				<div className="barblock__address">
					<i className="fas fa-map-marker-alt"></i> {address}
				</div>
			</div>
			<div className="barblock__type">
				<span
					className={is_bar ? "barblock__type__active" : null}
				> 
					<i className="fas fa-beer"></i> Бар
				</span> 
				<span
					className={is_shop ? "barblock__type__active" : null}
				>
					<i className="fas fa-shopping-basket"></i> Магазин
				</span> 
				<span 
					className={is_brewery ? "barblock__type__active" : null}
				>
					<i className="fas fa-bong"></i> Пивоварня</span>
			</div>
		</Link>

	}
}
