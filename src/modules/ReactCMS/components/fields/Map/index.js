import React, { Component } from 'react';

import PropTypes from 'prop-types';

// import GoogleMap from 'material-ui-components/src/GoogleMap';
// import GoogleMap from 'modules/Sportpoisk/components/GoogleMap';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
// import GoogleMapReact from 'google-map-react';
import GoogleMapReact from '../../Map';
// import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';

// import Helper from 'src/modules/ReactCMS/components/Helper';

// import Control from './Controls';
// import Control from 'modules/Sportpoisk/components/GoogleMap/Controls/layout'; 
import Control from 'src/modules/google-map-react-control';

// const Control = require('google-map-react-control');


// import YandexSearch from 'src/modules/ReactCMS/components/YandexMap/Search';

const defaultProps = {}

// import SearchControl from 'modules/Sportpoisk/components/GoogleMap/Controls/UserMenu/index.js';

// export {Control};

export default class ItemMap extends Component {

	static propTypes = {
		item: PropTypes.object.isRequired,
		updateItem: PropTypes.func.isRequired,
	};

	static contextTypes = {
		// connector_url: PropTypes.string.isRequired,
	};

	constructor(props) {

		super(props);

		this.state = {
			draggable: true,
		}
	}


	inEditMode() {

		const {
			item: {
				_isDirty,
			},
		} = this.props;

		return _isDirty ? true : false;
	}


	onChildMouseDown = (key, props, coords) => {

		if (!this.inEditMode()) {
			return;
		}

		this.setState({
			draggable: false,
		});

		return;
	}


	onChildMouseUp = () => {


		if (!this.inEditMode()) {
			return;
		}

		this.setState({
			draggable: true,
		});
	}

	onChildMouseMove = (key, marker, newCoords) => {

		// let {
		// } = marker;

		if (!this.inEditMode()) {
			return;
		}

		let {

			// PlacesStore
			item,
			updateItem,
			onChange,
		} = this.props;

		// let {
		// } = this.context;


		// // PlacesStore.getDispatcher().dispatch(PlacesStore.actions['UPDATE'], item, newCoords);

		// updateItem(item, newCoords, PlacesStore);

		const data = {
			coords: newCoords,
			...newCoords,
		};

		updateItem(item, data);

		onChange && onChange(item, data);

		this.forceUpdate();
	}

	onGoogleApiLoaded = (api) => {

		let {
			map,
			maps,
		} = api;



		this.setState(api);
	}

	render() {

		if (typeof window === "undefined") {
			return null;
		}

		let {
			item,
			updateItem,
			onFocus,
			helper,
			error,
			helperText,
			onChange,
			_isDirty,
			...other
		} = this.props;

		let {
			mapTilesLoaded,
			draggable,
			map,
			maps,
		} = this.state;

		let {
			name,
			// coords,
			latitude: lat,
			longitude: lng,
		} = item;

		// const {
		// 	lat,
		// 	lng,
		// } = coords || {};

		if (!lat || !lng) {
			return null;
		}


		return <div
			style={{
				height: 400,
			}}
		>
			<GoogleMapReact
				// ref="GoogleMapReact"
				// apiKey="AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU"
				defaultCenter={{
					lat: lat,
					lng: lng,
				}}
				center={draggable && {
					lat: lat,
					lng: lng,
				} || undefined}
				defaultZoom={15}
				draggable={draggable}
				onChildMouseDown={this.onChildMouseDown}
				onChildMouseUp={this.onChildMouseUp}
				onChildMouseMove={this.onChildMouseMove}
				onGoogleApiLoaded={this.onGoogleApiLoaded}
				options={{
					fullscreenControl: false,
					overviewMapControl: false,
					streetViewControl: true,
					rotateControl: true,
					mapTypeControl: true,
					// disable poi
					styles: [
						{
							featureType: 'poi',
							elementType: 'labels',
							stylers: [{ visibility: 'off' }],
						},
					],
				}}
			>


				{/* <SimpleMarker 
	    		lat={lat}
	    		lng={lng}
	    		map={map}
	    	>

	    	</SimpleMarker> */}

			</GoogleMapReact>

			{map && maps
				?
				<Control
					map={map}
					maps={maps}
					position="TOP_CENTER"
				>

					<Grid
						container
						gutter={0}
						align="center"
					>

						{/* <Grid
    					item
    					xs
    				>

		    			<YandexSearch 
			    			map={map}
			    			maps={maps}
			    			style={{
			    				minWidth: 300
			    			}}
			    			error={error || false}
			    			textFieldProps={{
			    				helperText: helperText || undefined,
			    				onFocus,
			    			}}
			    			onNewRequest={(event, value, mapItem) => {
							  	let {
							  		coordinates: {
							  			0: lat,
							  			1: lng,
							  		},
							  	} = mapItem;

							  	const data = {
							  		lat,
							  		lng,
							  		coords: {
								  		lat,
								  		lng,
								  	},
							  	};

							  	updateItem(item, data);

								}}
		    			/>
    					
    				</Grid> */}


					</Grid>



				</Control>

				:
				null
			}


			{map && maps
				?
				<Control
					map={map}
					maps={maps}
					position="BOTTOM_LEFT"
					style={{
						padding: 4,
					}}
				>

					<a
						href="https://maps.yandex.ru"
						rel="nofollow"
						style={{
							color: "#fff",
							textShadow: "0px 0px 5px #888",
							fontSize: "16px",
						}}
						target="_blank"
					>
						Yandex.Maps
    			</a>

				</Control>

				:
				null
			}

		</div>;
	}
}
