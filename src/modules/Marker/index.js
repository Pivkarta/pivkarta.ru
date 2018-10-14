
import React, { Component } from 'react';

import PropTypes from 'prop-types';

// import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';
// import ClusterMarker from 'google-map-react/develop/markers/ClusterMarker';
import ClusterMarker from './markers/ClusterMarker';

import IconButton from 'material-ui/IconButton';
import Business from 'material-ui-icons/Business';
import Texture from 'material-ui-icons/Texture';
import EditIcon from 'material-ui-icons/ModeEdit';

import { Link } from 'react-router-dom';

import CompanyMiniCart from './Company';

export default class Marker extends Component {

	static proTypes = {
		cluster: PropTypes.object.isRequired,
	};


	// shouldComponentUpdate(){



	// 	return false;

	// }

	render() {


		// return "df";

		let {
			// item,
			// geometry: {
			// 	coordinates: {
			// 		0: lat,
			// 		1: lng,
			// 	},
			// }
			item,
			cluster,
			clusters,
			expandAllCompanies,
			expanded: _expandedOnMap,
			...other
		} = this.props;

		let {
			properties: {
				point_count,
				point_count_abbreviated,
				item: clusterItem,
				type,
				hovered,
				openEditor,
			}
		} = cluster || {}

		let marker = null;


		let {
			minPrice,
			maxPrice,
		} = item || {};



		if (item) {

		}
		else {

			// const {
			// 	properties: {
			// 		item: clusterItem,
			// 	},
			// } = cluster;

			// minPrice = 100;
			// maxPrice = 300;


			try {

				const leaves = clusters.getLeaves(cluster.properties.cluster_id, -1);

				leaves && leaves.map(({ properties: { item: clusterItem } }) => {


					if (clusterItem) {

						const {
							minPrice: min,
							maxPrice: max,
						} = clusterItem;



						if (min && (min < minPrice || !minPrice)) {
							minPrice = min;
						}

						if (max && (max > maxPrice || !maxPrice)) {
							maxPrice = max;
						}

						// if(max){

						// }

					}

				})
			}
			catch (error) {
				console.error(error);
			}





		}




		let prices;

		if (minPrice || maxPrice) {
			prices = <div
				style={{
					whiteSpace: "nowrap",
					background: "rgba(255,255,255,0.7)",
					padding: "1px 3px",
					fontSize: "0.9rem",
					fontFamily: 'Arial, "Sans serif"',
				}}
				>
				₽ <span
					style={{
						fontWeight: "bold",
					}}
				>
					{(minPrice === maxPrice) || !minPrice ? maxPrice : `${minPrice} - ${maxPrice}`}
				</span>
			</div>;
		}


		if (item) {

			const {
				id,
				place_id,
				ratingAvg,
				tvs,
				mapIcon,
				is_bar,
				is_shop,
				is_brewery,
				_type: typename,
				_isDirty,
				uri,
				gallery,
				minPrice,
				maxPrice,
			} = item;

			const {
				approved,
			} = tvs || {};

			// if(_isDirty){

			// }


			let width;

			let iconSrc;

			let iconClasses = ["map--icon"];

			hovered && iconClasses.push('hovered');

			if (approved) {
				// width = hovered ? 40 : 36;
				iconClasses.push("approved");
			}
			else {
				// width = hovered ? 34 : 28;
			}

			if (mapIcon) {
				iconSrc = mapIcon;
				width = hovered ? 46 : 40;
				iconClasses.push("company");
			}
			else {
				iconClasses.push("default");
			}


			if (is_bar) {
				iconClasses.push("bar");
			}

			if (is_shop) {
				iconClasses.push("shop");
			}

			if (is_brewery) {
				iconClasses.push("brewery");
			}




			switch (typename) {

				// Связка Компания-ГеоОбъект
				case "PlaceContactType":

					const {
						Contact,
					} = item;

					const {
						id,
						name,
						contact_services,
						uri,
						// image,
						// imageFormats,
						gallery,
						mapIcon: icon,
					} = Contact || {};

					// contact_services && contact_services.map(n => {

					// 	const {
					// 		Service,
					// 	} = n || {};

					// 	const {
					// 		icon,
					// 	} = Service || {};

					// 	if(icon){

					// 		iconSrc = icon;

					// 	}

					// });

					if (icon) {

						const {
							image,
							imageFormats,
						} = icon;

						const {
							thumb,
						} = imageFormats || {};

						if (thumb) {
							iconSrc = thumb;
						}
						// if(image){
						// 	iconSrc = image;
						// }

					}

					Object.assign(item, {
						id,
						uri: `search/firm/${id}/`,
						name,
						// image,
						// imageFormats,
						gallery,
						icon,
					});



					break;

			}


			// const {
			// 	uri,
			// 	// image,
			// 	// imageFormats,
			// 	gallery,
			// } = item;


			const galleryItem = gallery && gallery[0];

			if (galleryItem) {

				const {
					image,
					imageFormats,
				} = galleryItem;

				Object.assign(item, {
					image,
					imageFormats,
				});

			}


			let link = uri || "/";


			typename && iconClasses.push(`type-${typename}`);

			let icon;

			// if(iconSrc){

			// 	icon = <img 
			// 		src={iconSrc}
			// 		className={"map--icon default"}
			// 	/>

			// }
			// else{

			// 	icon = <div
			// 		className={iconClasses.join(" ")}
			// 		// style={{
			// 		// 	width: '100%',
			// 		// }}
			// 	></div>

			// }

			icon = <div
				className={iconClasses.join(" ")}
				style={{
					backgroundImage: iconSrc && `url(${iconSrc})` || undefined,
				}}
			// style={{
			// 	width: '100%',
			// }}
			></div>


			// if(type == "Contact"){
			// 	Icon = Texture;
			// }
			// else{
			// 	Icon = Business;
			// }

			let details;

			// if(hovered){
			// if ((_expandedOnMap || expandAllCompanies) && id) {
			// details = <div
			// 	style={{
			// 		position: 'absolute',
			// 		zIndex: 1,
			// 		bottom: 50,
			// 		boxShadow: 'rgba(0,0,0, 0.3) 0px 0px 5px 2px',
			// 		padding: 5,
			// 		background: '#fff',
			// 	}}
			// >
			// 	<div
			// 		style={{
			// 			paddingBottom: 5,
			// 			fontSize: 14,
			// 		}}
			// 	>
			// 		{name} <Stars 
			// 			value={parseFloat(rating) || 0}
			// 		/>
			// 	</div>

			// 	{imageFormats
			// 		?
			// 		<img 
			// 			src={imageFormats.marker_thumb}
			// 		/>
			// 		:
			// 		null
			// 	}
			// </div>

			details = <div
				style={{
					position: "absolute",
					zIndex: 1,
					bottom: 40,
					// left: "50%",
					left: 7,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						// display: "none",
						position: 'absolute',
						bottom: 0,
					}}
				>

					{prices}

					{(_expandedOnMap || expandAllCompanies) && id ? <CompanyMiniCart
						// item={item}
						// ratings={ratingAvg}
						where={{
							id,
						}}
						style={{
							// zIndex: 1,
							boxShadow: 'rgba(0,0,0, 0.3) 0px 0px 5px 2px',
							background: '#fff',
							width: 200,
							padding: 5,
						}}
					// closeHandler={expandAllCompanies ? undefined : event => {

					// 	Object.assign(item, {
					// 		_expandedOnMap: false,
					// 	});

					// 	this.forceUpdate();

					// }}
					/> : null}

				</div>
			</div>
			// }

			marker = <div
				style={{
					width,
					// border: '1px solid blue',
					position: 'absolute',
					// left: -(width / 2),
					left: "-50%",
					bottom: 0,
					cursor: 'pointer',
				}}
			>
				{details}

				<div
					style={{
						position: 'relative',
					}}
				>
					<Link
						to={link}
						// href={link}
						onClick={event => {
							event.preventDefault();
							event.stopPropagation();
						}}
					>
						{icon}
					</Link>
				</div>
			</div>;

			// marker = <div
			// 	style={{
			// 		display: 'inline-block',
			// 		border: '1px solid red',
			// 		// marginLeft: hovered && openEditor ? -20 : 0,
			// 		// paddingRight: hovered ? 40 : 0,
			// 		position: 'absolute',
			// 		// height: 20,
			// 		// width: 20,
			// 		// top: -32,
			// 		// left: -20,
			// 		// left: hovered ? -24 : -12,
			// 	}}
			// >
			// 	{icon}
			// </div>

		}
		else {

			marker = <div
				style={{
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: -44,
						width: "100%",
						// border: "2px solid red",
						display: "flex",
						justifyContent: "center",
					}}
				>
					{prices}
				</div>
				<ClusterMarker
					text={point_count_abbreviated}
					hovered={hovered ? true : false}
				>
				</ClusterMarker>
			</div>

			// marker = <SimpleMarker
			//   // style={{
			//   // 	background: '#fff',
			//   // 	display: 'inline-block',
			//   // }}
			//  ></SimpleMarker>
		}

		return marker;
	}
}