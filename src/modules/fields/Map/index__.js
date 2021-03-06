import React, { Component } from 'react';

import PropTypes from 'prop-types';

// import GoogleMap from 'material-ui-components/src/GoogleMap';
// import GoogleMap from 'modules/Sportpoisk/components/GoogleMap';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui-icons/Save';

// import GoogleMapReact from 'google-map-react';
import Map from '../../Map';

// import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';
// import SimpleMarker from './markers/SimpleMarker';
import SimpleMarker from '../../Map/Markers/Marker';

// import Control from './Controls';
// import Control from 'modules/Sportpoisk/components/GoogleMap/Controls/layout'; 
// import Control from 'src/modules/google-map-react-control/src/';
import Control from 'src/modules/ui/Map/Control';

// const Control = require('google-map-react-control');


import YandexSearch from '../../YandexMap/Search';


// import SearchControl from 'modules/Sportpoisk/components/GoogleMap/Controls/UserMenu/index.js';

// export {Control};

export default class MapField extends Component {

	static propTypes = {
		item: PropTypes.object.isRequired,
		// updateItem: PropTypes.func.isRequired,
		// saveItem: PropTypes.func,
		onChildMouseMove: PropTypes.func,
		defaultCenter: PropTypes.object.isRequired,
		defaultZoom: PropTypes.number.isRequired,
	};


	static defaultProps = {
		defaultZoom: 12,
	};

	static contextTypes = {
		googleMapApiKey: PropTypes.string.isRequired,
		// connector_url: PropTypes.string.isRequired,
		// PlacesStore: PropTypes.object.isRequired,
		// ContactsStore: PropTypes.object.isRequired,
		// ServicesStore: PropTypes.object.isRequired,
	};

	constructor(props) {

		super(props);

		this.state = {
			draggable: true,
		}
	}



	onChildMouseDown(key, props, coords) {

		this.setState({
			draggable: false,
		});

		return;
	}


	onChildMouseUp() {


		this.setState({
			draggable: true,
		});
	}

	onChildMouseMove(key, marker, newCoords) {

		// let {
		// } = marker;

		let {

			// PlacesStore
			// item,
			onChildMouseMove,
		} = this.props;

		// let {
		// } = this.context;


		// // PlacesStore.getDispatcher().dispatch(PlacesStore.actions['UPDATE'], item, newCoords);

		// updateItem(item, newCoords, PlacesStore);
		// updateItem(item, newCoords);

		// this.forceUpdate();

		return onChildMouseMove ? onChildMouseMove(key, marker, newCoords) : false;
	}

	onGoogleApiLoaded(api) {

		let {
			map,
			maps,
		} = api;

		// function CenterControl(controlDiv, map) {

		//    // Set CSS for the control border.
		//    var controlUI = document.createElement('div');
		//    controlUI.style.backgroundColor = '#fff';
		//    controlUI.style.border = '2px solid #fff';
		//    controlUI.style.borderRadius = '3px';
		//    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		//    controlUI.style.cursor = 'pointer';
		//    controlUI.style.marginBottom = '22px';
		//    controlUI.style.textAlign = 'center';
		//    controlUI.title = 'Click to recenter the map';
		//    controlDiv.appendChild(controlUI);

		//    // Set CSS for the control interior.
		//    var controlText = document.createElement('div');
		//    controlText.style.color = 'rgb(25,25,25)';
		//    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
		//    controlText.style.fontSize = '16px';
		//    controlText.style.lineHeight = '38px';
		//    controlText.style.paddingLeft = '5px';
		//    controlText.style.paddingRight = '5px';
		//    controlText.innerHTML = 'Center Map';
		//    controlUI.appendChild(controlText);

		//    // Setup the click event listeners: simply set the map to Chicago.
		//    controlUI.addEventListener('click', function() {
		//      map.setCenter(chicago);
		//    });

		//  }

		//  var centerControlDiv = document.createElement('div');
		//  var centerControl = new CenterControl(centerControlDiv, map);

		//  centerControlDiv.index = 1;
		//  map.controls[maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


		this.setState(api);
	}

	render() {

		let {
			item,
			updateItem,
			saveItem,
			defaultCenter,
			defaultZoom,
			onSearchSelect,
			inEditMode,
			updateObject,
			children,
			...other
		} = this.props;


		let {
			mapTilesLoaded,
			draggable,
			map,
			maps,
		} = this.state;


		if(typeof window !== "undefined"){
			window.maps = maps;
			window.map = map;
		}


		const {
			googleMapApiKey: apiKey,
		} = this.context;

		let marker;
		let markers = [];

		var {
			// lat,
			// lng,
			name,
			// coords,
			lat,
			lng,
			_isDirty,
		} = item || {};

		// let {
		// 	lat: lat,
		// 	lng: lng,
		// } = coords || {};


		lat = lat ? parseFloat(lat) : undefined;
		lng = lng ? parseFloat(lng) : undefined;

		// if(!lat || !lng){
		// 	return null;
		// }
		// if (lat && lng && map) {
		if (lat && lng) {


			marker = <SimpleMarker
				lat={lat}
				lng={lng}
				draggable={inEditMode && updateObject ? true : false}
				onDragEnd={(event) => {


					if (updateObject) {

						const {
							latLng,
						} = event;



						const {
							lat,
							lng,
						} = latLng;

						updateObject({
							lat: lat(),
							lng: lng(),
						});

					}

				}}
			// draggable={true}
			>
			</SimpleMarker>


			// marker = <div
			// 	lat={lat}
			// 	lng={lng}
			// 	draggable={inEditMode && updateObject ? true : false}
			// 	onDragEnd={(event) => {


			// 		if (updateObject) {

			// 			const {
			// 				latLng,
			// 			} = event;



			// 			const {
			// 				lat,
			// 				lng,
			// 			} = latLng;

			// 			updateObject({
			// 				lat: lat(),
			// 				lng: lng(),
			// 			});

			// 		}

			// 	}}
			// // draggable={true}
			// >eee
			// </div>

			markers.push(marker);

		}



		// let map;
		// let google;

		// if(this.refs && this.refs.GoogleMapReact){
		// 	map = this.refs.GoogleMapReact.map_;
		// 	google = this.refs.GoogleMapReact.maps_;
		// }

		// if(this.refs.GoogleMapReact)

		return <div
			style={{
				height: 400,
				position: "relative",
			}}
		>
			<Map
				ref="GoogleMapReact"
				// mapKey={apiKey}
				defaultCenter={defaultCenter}
				defaultZoom={defaultZoom}
				draggable={draggable}
				onChildMouseDown={(key, props, coords) => this.onChildMouseDown(key, props, coords)}
				onChildMouseUp={() => this.onChildMouseUp()}
				onChildMouseMove={(key, marker, newCoords) => this.onChildMouseMove(key, marker, newCoords)}
				onGoogleApiLoaded={(api) => this.onGoogleApiLoaded(api)}
				markers={markers}
				{...other}
			>



				{children}

			</Map>

			{onSearchSelect && map && maps
				?
				<Control
					map={map}
					maps={maps}
					position="TOP"
					fullWidth
					containerProps={{
						// style: "width:300px;",
						// style: "width:200px;",
					}}

				>
					<YandexSearch
						map={map}
						maps={maps}
						// style={{
						// 	minWidth: 300
						// }}
						// onNewRequest={(event, value, mapItem) => {
						// 	let {
						// 		coordinates: {
						// 			0: lat,
						// 			1: lng,
						// 		},
						// 	} = mapItem;

						// 	updateItem && updateItem(item, {
						// 		lat,
						// 		lng,
						// 	});


						// }}

						onSelect={(event, item, maps, map) => {



							let {
								coordinates: {
									0: lat,
									1: lng,
								},
							} = item;



							const center = {
								lat,
								lng,
							};

							return onSearchSelect(event, item, center, maps, map);



							// updateItem && updateItem(item, {
							// 	lat,
							// 	lng,
							// });
						}}
						style={{
							// minWidth: 300,
							width: 400,
							// left: "-50%",
						}}
					/>
				</Control>

				:
				null
			}

			{/*map && maps
    		?
    		<Control
    			map={map}
    			maps={maps}
    			position="TOP_LEFT"
    		>

	    		<Button raised>wef</Button>
    		</Control>
    		
    		:
    		null
    	*/}

			{map && maps && saveItem
				?
				<Control
					map={map}
					maps={maps}
					position="TOP_LEFT"
				>
					{_isDirty &&
						<IconButton
							// onClick={(event) => saveItem(event, item)}
							onClick={(event) => item.save()}
						>
							<SaveIcon
								color="red"
							/>
						</IconButton>
						|| null
					}
				</Control>

				:
				null
			}

		</div>;
	}
}
