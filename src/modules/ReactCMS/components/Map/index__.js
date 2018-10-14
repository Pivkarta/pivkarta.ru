import './style/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Checkbox, { LabelCheckbox } from 'material-ui/Checkbox';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ExploreIcon from 'material-ui-icons/Explore';
import CloseIcon from 'material-ui-icons/Close';
import Business from 'material-ui-icons/Business';
import Texture from 'material-ui-icons/Texture';
import AddIcon from 'material-ui-icons/AddCircle';
import ShowAllIcon from 'material-ui-icons/InsertPhoto';

import GoogleMapReact from 'google-map-react';
// import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';

import supercluster from 'supercluster';

// window.supercluster = supercluster;

import { Link } from 'react-router-dom';

// import PlaceDialog from '../../Grid/Places/Dialog/index.js';

// import Marker from './MainView/Marker';
import Marker from 'Marker';
// import SideBar from './SideBar';

import Control from 'src/modules/google-map-react-control/';

// import YandexSearch from 'modules/src/modules/ReactCMS/components/YandexMap/Search';

import SearchBar from './MainView/SideBar/SearchBar';

import HumanIcon from 'material-ui-icons/PermIdentity';
import FaceIcon from 'material-ui-icons/Face';


const browserHistory = null;


export default class MapMainView extends Component {

	static contextTypes = {

		// user: PropTypes.object.isRequired,
		// appExports: PropTypes.object.isRequired,
		// document: PropTypes.object.isRequired,
		// openCompanyPage: PropTypes.func.isRequired,
		// wsRequest: PropTypes.func.isRequired,
		// router: PropTypes.object.isRequired,
		// CoordsStore: PropTypes.object.isRequired,
		// CompaniesStore: PropTypes.object.isRequired,
		// RatingsStore: PropTypes.object.isRequired,
		// setPageTitle: PropTypes.func.isRequired,
		// localQuery: PropTypes.func.isRequired,
		// getCounters: PropTypes.func.isRequired,
		// coords: PropTypes.object,
		// setCoords: PropTypes.func.isRequired,
		// initCoords: PropTypes.func.isRequired,
		// triggerGoal: PropTypes.func.isRequired,
		// userActions: PropTypes.object.isRequired,
		// documentActions: PropTypes.object.isRequired,
	};

	static defaultProps = {
		mapKey: "AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU",
		center: {
			lat: 55.752898,
			lng: 37.621908,
		},
		zoom: 11,
		overviewMapControl: false,
		streetViewControl: true,
		rotateControl: true,
		mapTypeControl: true,
	};

	static propTypes = {
		mapData: PropTypes.array.isRequired,
		params: PropTypes.object.isRequired,
	};

	constructor(props) {

		super(props);

		let {
			zoom,
			// mapData,
			overviewMapControl,
			streetViewControl,
			rotateControl,
			mapTypeControl,
		} = props;

		zoom = parseInt(zoom);


		const mapViewOptions = {
			overviewMapControl,
			streetViewControl,
			rotateControl,
			mapTypeControl,
			// disable poi
			styles: [
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [{ visibility: zoom > 17 ? 'on' : 'off' }],
				},
			],
		};

		this.state = {
			draggable: true,
			mapOptions: {
				center: props.center,
				defaultCenter: props.center,
				zoom,
			},
			center: props.center,
			zoom,
			clusters: null,
			// activePlaceItem: null,
			// sidebarOpen: true,
			cluster: null,
			inited: true,
			mounted: false,
			// mapData,
			mapViewOptions,
		}
	}


	triggerGoal(goal) {

		const {
			triggerGoal,
		} = this.context;

		triggerGoal(goal);

	}


	componentWillMount() {

		this.initCoords();

		this.createClusters();

		return super.componentWillMount && super.componentWillMount();
	}

	componentDidMount() {

		// const {
		// 	CompaniesStore,
		// 	RatingsStore,
		//   CoordsStore,
		// 	localQuery,
		// 	router: {
		// 		params,
		// 	},
		// } = this.context;


		// const {
		// 	mapData,
		// } = this.state;


		// // Если нет данных карты, подгружаем
		// if(!mapData){

		// 	this.loadMapData();

		// }


		// const {
		// 	city, 
		// } = params || {};

		// 	this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {


		// 		this.loadMapData();

		// 	});

		// 	this.RatingsStoreListener = RatingsStore.getDispatcher().register(payload => {

		// 		// this.createClusters();
		// 		this.loadMapData();

		// 	});

		// 	this.CoordsStoreListener = CoordsStore.getDispatcher().register(payload => {

		// 		// this.forceUpdate();
		// 		this.loadMapData();

		// 	});


		// 	this.setPageTitle();

		// 	this.setState({
		// 		mounted: true,
		// 	});

	}


	componentWillUnmount() {

		// let {
		// 	CompaniesStore,
		// 	RatingsStore,
		//   CoordsStore,
		// } = this.context;


		// if(this.CompaniesStoreListener){

		//   let dispatch = CompaniesStore.getDispatcher();

		//   dispatch._callbacks[this.CompaniesStoreListener] && dispatch.unregister(this.CompaniesStoreListener);

		//   this.CompaniesStoreListener = undefined;
		// }


		// if(this.RatingsStoreListener){

		//   let dispatch = RatingsStore.getDispatcher();

		//   dispatch._callbacks[this.RatingsStoreListener] && dispatch.unregister(this.RatingsStoreListener);

		//   this.RatingsStoreListener = undefined;
		// }


		// if(this.CoordsStoreListener){

		//   let dispatch = CoordsStore.getDispatcher();

		//   dispatch._callbacks[this.CoordsStoreListener] && dispatch.unregister(this.CoordsStoreListener);

		//   this.CoordsStoreListener = undefined;
		// }


		return super.componentWillUnmount && super.componentWillUnmount();
	}


	componentDidUpdate(prevProps, prevState, prevContext) {


		return;

		const {
			city: currentCity,
		} = this.state;


		let {
			router,
		} = this.context;

		/*
			Если поменялись координаты в роунитге, двигаем карту
		*/

		let {
			lat,
			lng,
			zoom,
			city,
		} = router.params || {};

		zoom = parseInt(zoom);

		// 



		if ((currentCity || city) && (currentCity !== city)) {

			this.setState({
				city,
			}, () => {
				this.setPageTitle();
			});

		}

		let {
			center: {
				lat: currentLat,
				lng: currentLng,
			},
			zoom: currentZoom,
		} = this.state;

		currentZoom = parseInt(currentZoom);

		if (
			lat && lng && zoom
			&& (
				lat != currentLat
				|| lng != currentLng
				|| zoom !== currentZoom
			)
		) {

			this.setState({
				center: {
					lat: parseFloat(lat),
					lng: parseFloat(lng),
				},
				zoom,
			});
		}

		const {
			mapData,
		} = this.props;


		const {
			mapData: prevMapData,
		} = prevProps;



		// if(mapData && mapData.companies && (!prevMapData || !prevMapData.companies)){

		// 	this.createClusters();

		// }

		if (
			(mapData || prevMapData) && (mapData !== prevMapData)) {

			this.createClusters();



		}


		return super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext) || true;
	}



	// loadMapData(){


	// 	return;


	//   const {
	//     // CompaniesStore,
	//     // document,
	//     localQuery,
	//   } = this.context;


	//   localQuery({
	//     operationName: "MapCompanies",
	//     variables: {
	//       limit: 0,
	//       // "companyIds": [1275, 1542, 1259],
	//     },
	//   })
	//   .then(r => {


	//     const {
	//       companies,
	//     } = r.data || {};

	//     this.setState({
	//     	mapData: r.data,
	//     }, () => {

	//     	this.createClusters();

	//     });


	//   })
	//   .catch(e => {
	//     console.error('MapCompanies', e);
	//   });

	//   return;

	// }



	async setPageTitle(title) {

		const {
			localQuery,
			setPageTitle,
		} = this.context;


		const {
			router: {
				params,
			},
		} = this.context;

		const {
			city,
		} = params || {};


		if (!title && city) {

			let response = await localQuery({
				operationName: "Cities",
			});

			const {
				resources: cities,
			} = response.data;



			const currentCity = cities && cities.find(n => n.alias === city);




			if (currentCity) {

				title = currentCity.name;


			}



		}



		setPageTitle(title);

	}

	initCoords() {


		return;

		const {
			// coords,
			initCoords,
		} = this.context;



		// coords && Object.assign(this.state, coords);

		const coords = initCoords();

		if (!coords) {
			return;
		}

		const {
			lat,
			lng,
			zoom,
		} = coords;

		const center = {
			lat,
			lng,
		};

		Object.assign(this.state, {
			center,
			zoom,
			mapOptions: {
				center,
				zoom,
			}
		});

		return;
	}


	onChildClick = (key, props) => {



		// 


		const {
			zoom,
			map,
			maps,
		} = this.state;



		// setCenter

		let {
			lat,
			lng,
			cluster,
		} = props || {};

		if (!cluster) {
			return;
		}

		let {
			openCompanyPage,
		} = this.context;

		let {
			properties: {
				cluster_id,
				cluster: isCluster,
				item,
				// hovered,
			},
		} = cluster;


		// cluster

		if (item) {
			// openCompanyPage(item);

			// const {
			// 	_expandedOnMap,
			// } = item;


			// Object.assign(item, {
			// 	_expandedOnMap: !_expandedOnMap,
			// });

			this.forceUpdate();


		}
		else {

			if (lat && lng && zoom) {

				map.setCenter(new maps.LatLng(lat, lng));

				map.setZoom(zoom < 12 ? zoom + 3 : zoom + 1);

			}

		}

		// this.setState({cluster_id});

		return;

	}

	onGoogleApiLoaded = (options) => {

		let {
			map,
			maps,
		} = options;



		map.setClickableIcons(false);

		this.setState({
			map,
			maps,
		});
	}

	onChildMouseMove(key, marker, newCoords) {

		let {
			item,
		} = marker;

		let {

		} = this.props;

		let {
			updateItem,
		} = this.context;



		this.forceUpdate();
	}

	onChildMouseEnter = (key, props) => {


		let {
			cluster,
		} = props || {};

		if (!cluster) {
			return;
		}


		cluster && cluster.properties && Object.assign(cluster.properties, {
			hovered: true,
		});

		this.forceUpdate();
	}

	onChildMouseLeave = (key, props) => {
		// 

		let {
			cluster,
		} = props || {};

		if (!cluster) {
			return;
		}

		cluster && cluster.properties && Object.assign(cluster.properties, {
			hovered: false,
		});

		this.forceUpdate();
	}



	handleMapChange = ({ center, zoom, bounds }) => {



		this.setState({
			center, zoom, bounds,
		});

		return;


		let {
			lat,
			lng,
		} = center;

		// 

		let {
			router,
		} = this.context;

		var location = router.getCurrentLocation();

		let {
			pathname,
		} = location;


		if (lat && lng) {

			const {
				wsRequest,
			} = this.context;

			wsRequest({
				type: "coords",
				coords: {
					lat,
					lng,
					zoom,
				},
			});

		}

		lat = lat && parseFloat(parseFloat(lat).toFixed(6)) || undefined;
		lng = lng && parseFloat(parseFloat(lng).toFixed(6)) || undefined;

		if (lat && lng) {

			pathname = location.pathname.replace(/(.*\/)@([\d+\,\.\-]*)?/, '$1').replace(/\/\/+/g, '/');

			pathname = pathname.replace(/(.*\/)/, `$1@${lat},${lng},${zoom}`);

			location.pathname = pathname;



			browserHistory.push(location);

		}

		// 


		this.setState(
			{
				center,
				zoom,
				bounds,
			},
			() => {

				const {
					setCoords,
				} = this.context;

				setCoords({
					lat,
					lng,
					zoom,
				});

			}
		);
	};

	createClusters(props) {

		const {
			mapData: objects,
		} = this.props;
		// } = this.state;

		// const {
		// 	companies,
		// } = mapData || {};

		this.prepareClusters(objects);

	};


	prepareClusters(companies) {



		const {
			mounted,
		} = this.state;


		let markersData = [];


		companies && companies.map(item => {

			item = {...item}

			let {
				id,
				// coords,
				lat,
				lng,
				name,
				_type,
			} = item;

			// let {
			// 	lat,
			// 	lng,
			// } = coords || {};

			// 

			if (!lat || !lng) {
				return;
			}

			// let uri;


			// switch(_type){

			// 	case "Place":

			// 		uri = `/places/${id}/`;

			// 		break;

			// 	case "Company":

			// 		uri = `/companies/${id}/`;

			// 		break;

			// }

			// Object.assign(item, {
			// 	uri,
			// });




			markersData.push({
				"type": "Feature",
				"properties": {
					item: item,
					type: "Contact",
					openEditor: () => {
						browserHistory.push(`/db/contacts/${id}/`);
					},
					"scalerank": 3,
					"name": name,
					"comment": null,
					"name_alt": null,
					"lat_y": lat,
					"long_x": lng,
					"region": "North America",
					"subregion": null,
					"featureclass": "cape"
				},
				"geometry": {
					"type": "Point",
					"coordinates": [lng, lat]
				}
			});
		});

		const clusters = supercluster({
			// log: true,
			radius: 60,
			extent: 256,
			// maxZoom: 15,
		}).load(markersData);


		Object.assign(this.state, {
			clusters,
		});

		if (mounted) {
			this.forceUpdate();
		}

		return;
	}


	getClusters = () => {

		const {
			clusters,
		} = this.state;

		return clusters;
	};


	getMap() {
		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		return mapProvider && mapProvider.map_ || undefined;
	}

	setMapPosition(lat, lng) {
		let {
			// map,
			maps,
		} = this.state;


		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		let map = this.getMap();

		map && map.setCenter(new maps.LatLng(lat, lng));
		return;
	}

	resizeMap() {

		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		mapProvider && mapProvider._mapDomResizeCallback();
		// mapProvider2 && mapProvider2._mapDomResizeCallback();
	}


	isInAdvCoords(bounds) {


		const {
			center,
			zoom,
		} = this.state;

		if (!bounds || !center || !zoom || zoom < 13) {
			return;
		}

		let {
			minLat,
			maxLat,
			minLng,
			maxLng,
		} = bounds;


		const {
			lat,
			lng,
		} = center;



		if (
			lat < maxLat && lat > minLat
			&&
			lng > minLng && lng < maxLng
		) {
			return true;
		}

		return false
	}

	getScreenBounds(real) {

		// return {
		// 	minLat: -80,
		// 	maxLat: 80,
		// 	minLng: -180,
		// 	maxLng: 180,
		// };

		if (typeof window === "undefined") {

			return {
				minLat: -80,
				maxLat: 80,
				minLng: -180,
				maxLng: 180,
			};

		}


		let {
			bounds,
			zoom,
		} = this.state;

		const {
			nw,
			se,
		} = bounds || {};

		if (!nw || !se) {
			return;
		}

		let {
			lat: maxLat,
			lng: minLng,
		} = nw,
			{
				lat: minLat,
				lng: maxLng,
			} = se
			;


		let index = 1

		const latDiff = Math.round(maxLat - minLat) / index;
		const lngDiff = Math.round(maxLng - minLng) / index;

		if (zoom > 6 && !real) {

			minLat -= latDiff;
			maxLat += latDiff;

			minLng -= lngDiff;
			maxLng += lngDiff;

		}


		if (maxLat < 0) {
			maxLat = Math.abs(maxLat);
		}

		if (maxLng < 0) {
			maxLng = Math.abs(maxLng);
		}

		return {
			minLat,
			maxLat,
			minLng,
			maxLng,
		};
	}


	getControls(map, maps) {

		if (!map || !maps) {
			return null;
		}

		let controls = [];

		controls.push(this.getSearchBarControl(map, maps));
		controls.push(this.getListViewControl(map, maps));
		controls.push(this.getExpandViewControl(map, maps));
		controls.push(this.getAddCompanyControl(map, maps));
		controls.push(this.getYandexCopyControl(map, maps));
		controls.push(this.getCountersControl(map, maps));

		return controls;

	}


	getSearchBarControl(map, maps) {

		return <SearchBar
			key="SearchBar"
			map={map}
			maps={maps}
		/>;

	}

	getListViewControl(map, maps) {

		return <Control
			key="listView"
			map={map}
			maps={maps}
			position="TOP_LEFT"
		>

			<Link
				to={`/place/showlist/`}
				href={`/place/showlist/`}
				style={{
					background: "#fff",
					color: "#666",
					display: "block",
					margin: "10px 0 0 -10px",
					padding: "0 8px",
					borderRadius: 2,
					boxShadow: "0 0 0 1px #00000014",
					lineHeight: "29px",
				}}
			>
				Показать списком
			</Link>

		</Control>

	}

	getExpandViewControl(map, maps) {

		const {
			expandAllCompanies,
		} = this.state;

		return <Control
			key="expandView"
			map={map}
			maps={maps}
			position="LEFT_TOP"
		>
			<IconButton
				style={{
					borderRadius: "50%",
					backgroundColor: "rgba(255,255,255,0.5)",
					width: 35,
					height: 35,
					marginRight: 5,
					marginTop: 5,
					marginLeft: 10,
				}}
				accent={!expandAllCompanies}
				onClick={e => {

					this.setState({
						expandAllCompanies: !expandAllCompanies,
					});

					this.triggerGoal('showAllCompanies');

				}}
			>
				<ShowAllIcon
				/>
			</IconButton>

		</Control>

	}

	getAddCompanyControl(map, maps) {

		const {
			user: {
				user: currentUser,
			},
		} = this.context;

		if (!currentUser || currentUser.sudo !== true) {
			return null;
		}

		return <Control
			key="addCompany"
			map={map}
			maps={maps}
			position="LEFT_BOTTOM"
		>

			<a
				href="javascript:;"
				style={{
					// textShadow: "0px 0px 5px #ccc",
					fontSize: "15px",
					background: "rgba(256,256,256,0.7)",
					display: "block",
					paddingRight: 10,
				}}
				onClick={e => {

					const {
						localQuery,
					} = this.context;

					localQuery({
						operationName: "addCompany",
					});

					this.triggerGoal('addCompanyClick');

				}}
			>
				<Grid
					container
					spacing={0}
					align="center"
				>
					<IconButton
						style={{
							borderRadius: "50%",
							backgroundColor: "rgba(255,255,255,0.5)",
							width: 45,
							height: 45,
							marginRight: 5,
							marginTop: 0,
						}}
						accent
						className="flex align-center"
					>
						<AddIcon
							style={{
								height: 45,
								width: 45,
							}}
						/>
					</IconButton>
					Добавить заведение
				</Grid>
			</a>

		</Control>

	}

	getYandexCopyControl(map, maps) {

		return <Control
			key="yandexCopy"
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
				target="_blank"
				style={{
					color: "#fff",
					textShadow: "0px 0px 5px #888",
					fontSize: "16px",
				}}
			>
				Yandex.Maps
			</a>

		</Control>

	}

	getCountersControl(map, maps) {

		const {
			getCounters,
		} = this.context;

		return <Control
			key="counters"
			map={map}
			maps={maps}
			position="BOTTOM_LEFT"
		>

			{getCounters()}

		</Control>

	}


	isInScreen = (item) => {

		let {
			bounds: {
				nw,
				se,
			},
		} = this.state;

		let {
			lat,
			lng,
		} = item;


		if (!lat || !lng || !nw || !se) {
			return;
		}


		if (
			lat < nw.lat && lat > se.lat
			&&
			lng > nw.lng && lng < se.lng
		) {
			return true;
		}

		return false
	}


	render() {

		let {
			children,
			mapKey: key,
		} = this.props;

		const {
			map,
			maps,
			center,
			draggable,
			clusters,
			// activePlaceItem,
			// sidebarOpen,
			zoom,
			cluster_id,
			bounds,
			inited,
			expandAllCompanies,
			mapOptions,
			mapViewOptions,
		} = this.state;

		const {
			CoordsStore,
			// classes,
			user,
		} = this.context;


		const {
			user: currentUser,
		} = user || {};


		const {
			minLat,
			maxLat,
			minLng,
			maxLng,
		} = this.getScreenBounds() || {};

		const {
			...advBounds,
		} = this.getScreenBounds(true) || {};




		let advItems = [];

		// const allowAds = this.isInAdvCoords({
		// 	maxLat: 55.63,
		// 	maxLng: 37.8,
		// 	minLat: 55.55,
		// 	minLng: 37.6,
		// });

		// if(allowAds){
		// 	advItems.push(<div>
		// 		<Link
		// 			to={`/bani/vidnovskie-bani/`}
		// 			href={`/bani/vidnovskie-bani/`}
		// 		>
		// 			<img
		// 				src="http://pivkarta.ru/images/resized/slider_thumb/assets/images/companies/1525-vidnovskie-bani/5Y5A6418.jpg"
		// 				style={{
		// 					width: 200,
		// 				}}
		// 			/>
		// 		</Link>
		// 	</div>);
		// }

		/*
			Router module
		*/
		// if (children) {
		// 	return <div
		// 		style={{
		// 			height: '100%',
		// 		}}
		// 	>
		// 		{children}
		// 	</div>
		// }


		if (!inited) {
			return "null";
		}



		// 

		let {
			savePlaceItem,
		} = this.context;

		let items = [];

		let sidebar_items_list = [];




		// clusters && clusters.getClusters([50, 35, 60, 60], zoom || 4).map(cluster => {
		clusters && minLng && minLat && zoom && clusters.getClusters([minLng, minLat, maxLng, maxLat], zoom).map((cluster, index) => {
			// clusters && clusters.getClusters([minLng, minLat, maxLng, maxLat], zoom || 4).map(cluster => {

			// if(cluster.properties.type == "Contact"){
			// 	// 
			// }


			let {
				properties: {
					type,
					item,
				},
			} = cluster;

			let {
				geometry: {
					coordinates: {
						0: lng,
						1: lat,
					},
				}
			} = cluster;

			let {
				id,
				_type: typename,
			} = item || {}




			items.push(<Marker
				// key={`${typename}_${id}`} 
				key={item ? `${id}_${type}_${index}` : `cluster_${zoom}_${items.length}`}
				lat={lat}
				lng={lng}
				item={item}
				cluster={cluster}
				expandAllCompanies={expandAllCompanies}
			/>);




			return;
		});


		// 
		let staticMapUrl;

		staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=640x640&maptype=roadmap&key=${key}`;

		return <Grid
			container
			style={{
				height: '100%',
				width: "100%",
			}}
			spacing={0}
		>


			<GoogleMapReact
				bootstrapURLKeys={{
					key,
				}}
				defaultCenter={mapOptions.center}
				defaultZoom={mapOptions.zoom}
				center={center} // current map center
				zoom={this.state.zoom} // current map zoom
				ref="mapProvider"
				draggable={draggable}
				onGoogleApiLoaded={this.onGoogleApiLoaded}
				yesIWantToUseGoogleMapApiInternals={true}
				onChange={this.handleMapChange}
				// onChildClick={this.onChildClick}
				onChildMouseEnter={this.onChildMouseEnter}
				onChildMouseLeave={this.onChildMouseLeave}
				style={{
					display: "flex",
					flexGrow: 1,
					position: "relative",
					overflow: "hidden",
					background: typeof window === "undefined" ? `url(${staticMapUrl}) no-repeat center` : undefined,
				}}
				options={mapViewOptions}
			>
				{items}

				{children}

			</GoogleMapReact>

			{/* {this.getControls(map, maps)} */}


			{/* {map && maps
				?
				<Control
					map={map}
					maps={maps}
					position="RIGHT_BOTTOM"
				>

					{advItems}

				</Control>

				:
				null
			} */}

		</Grid>

	}
} 