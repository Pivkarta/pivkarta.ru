import './style/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/AddCircle';
import ShowAllIcon from 'material-ui-icons/InsertPhoto';


import supercluster from 'supercluster';

import { Link } from 'react-router-dom';


import Control from 'src/modules/google-map-react-control/';


import SearchBar from './MainView/SideBar/SearchBar';


import URI from 'urijs';


// import Marker from './MainView/Marker';

// import NewMap from './NewMap';
import NewMap from 'src/modules/Map/View';


import Marker from 'src/modules/Map/Markers/Marker/GeoObject';
// import Marker from 'Marker';

const browserHistory = null;


export default class MapMainView2 extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	static defaultProps = {
		// mapKey: "AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU",
		center: {
			lat: 55.752898,
			lng: 37.621908,
		},
		zoom: 11,
		overviewMapControl: false,
		streetViewControl: true,
		rotateControl: true,
		mapTypeControl: false,
		Marker,
	};

	static propTypes = {
		mapData: PropTypes.array.isRequired,
		params: PropTypes.object.isRequired,
		Marker: PropTypes.func.isRequired,
	};


	static childContextTypes = {
		mapItems: PropTypes.array,
	}

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
			mapItems: [],
			expanded: [],		// Массив развернутых элементов
		}
	}


	// shouldComponentUpdate(){
	// 	return false;
	// }


	getChildContext() {

		const {
			mapItems,
		} = this.state;

		return {
			mapItems,
		};

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

		this.setState({
			mounted: true,
		});

	}


	// componentWillUnmount() {



	// 	return super.componentWillUnmount && super.componentWillUnmount();
	// }


	componentDidUpdate(prevProps, prevState, prevContext) {





		const {
			loading,
			mapData,
		} = this.props;

		const {
			loading: prevLoading,
			mapData: prevMapData,
		} = prevProps;


		if (prevLoading && prevLoading !== loading) {
		}



		if ((mapData || prevMapData) && mapData !== prevMapData) {
			this.createClusters();
		}


	}





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
			clusters,
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
			properties: {
				cluster_id,
				item,
			},
		} = cluster;


		// cluster

		if (item) {



			const {
				id,
			} = item;

			let {
				expanded,
			} = this.state;

			const index = expanded.indexOf(id);

			if (index !== -1) {
				expanded.splice(index, 1);
			}
			else {
				expanded.push(id);
			}

			this.setState({
				expanded,
			});

			// openCompanyPage(item);

			// const {
			// 	_expandedOnMap,
			// } = item;


			// Object.assign(item, {
			// 	_expandedOnMap: !_expandedOnMap,
			// });

			// this.forceUpdate();


		}
		else {
			// Клик по кластеру

			let expansionZoom;

			try {
				expansionZoom = clusters.getClusterExpansionZoom(cluster_id);
			}
			catch (error) {
				console.error(error);
			}





			const currentZoom = map.getZoom();

			const newZoom = expansionZoom && expansionZoom > currentZoom ? expansionZoom : currentZoom + 1;

			map.setZoom(newZoom);

			/**
			 * Если разница зума более чем на 1, то центрируем карту,
			 * чтобы маркеры не убегали с поля видимости
			 */

			if (newZoom - currentZoom !== 1) {

				const LatLng = new maps.LatLng({
					lat,
					lng,
				})

				map.panTo(LatLng);

			}

		}


		return;

	}


	onGoogleApiLoaded = (options) => {

		let {
			map,
			maps,
		} = options;



		map.setClickableIcons(false);

		global.map = map;
		global.maps = maps;

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


	// Пересчитываем маркеры для карты
	recalculateMarkers() {


		const {
			clusters,
			zoom,
			expandAllCompanies,
		} = this.state;

		// let sidebar_items_list = [];
		let mapItems = [];

		// let items = [];

		const {
			minLat,
			maxLat,
			minLng,
			maxLng,
		} = this.getScreenBounds() || {};




		const sizes = [200, 100, 50, 20, 10];

		clusters && minLng && minLat && zoom && clusters.getClusters([minLng, minLat, maxLng, maxLat], zoom).map((cluster, index) => {

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


			mapItems.push(cluster);



			return;
		});

		this.setState({
			mapItems,
		});

	}


	handleMapChange = ({ center, zoom, bounds }) => {



		this.setState({
			center, zoom, bounds,
		}, () => {

			const {
				history,
				location,
			} = this.props;

			const {
				lat,
				lng,
			} = center || {};

			const {
				pathname,
				search,
			} = location;

			let newLocationPath;
			let newGeoPath;

			if (lat && lng && zoom) {
				newGeoPath = `@` + [lat.toFixed(6), lng.toFixed(6), zoom].join(",");
			}

			const index = pathname.indexOf("@");

			if (index !== -1) {
				newLocationPath = pathname.replace(/\@[0-9,\.]+/, newGeoPath);
			}
			else {
				newLocationPath = pathname.replace(/\/?$/, `/${newGeoPath}/`);

			}

			if (newLocationPath) {

				let uri = new URI(newLocationPath).query(search);



				history.replace(uri.toString());

			}



			this.recalculateMarkers();
		});

		return;


		// let {
		// 	lat,
		// 	lng,
		// } = center;

		// // 

		// let {
		// 	router,
		// } = this.context;

		// var location = router.getCurrentLocation();

		// let {
		// 	pathname,
		// } = location;


		// if (lat && lng) {

		// 	const {
		// 		wsRequest,
		// 	} = this.context;

		// 	wsRequest({
		// 		type: "coords",
		// 		coords: {
		// 			lat,
		// 			lng,
		// 			zoom,
		// 		},
		// 	});

		// }

		// lat = lat && parseFloat(parseFloat(lat).toFixed(6)) || undefined;
		// lng = lng && parseFloat(parseFloat(lng).toFixed(6)) || undefined;

		// if (lat && lng) {

		// 	pathname = location.pathname.replace(/(.*\/)@([\d+\,\.\-]*)?/, '$1').replace(/\/\/+/g, '/');

		// 	pathname = pathname.replace(/(.*\/)/, `$1@${lat},${lng},${zoom}`);

		// 	location.pathname = pathname;



		// 	browserHistory.push(location);

		// }

		// // 


		// this.setState(
		// 	{
		// 		center,
		// 		zoom,
		// 		bounds,
		// 	},
		// 	() => {

		// 		const {
		// 			setCoords,
		// 		} = this.context;

		// 		setCoords({
		// 			lat,
		// 			lng,
		// 			zoom,
		// 		});

		// 	}
		// );
	};

	createClusters = (props) => {

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

			item = { ...item }

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

			let uri;


			switch (_type) {

				case "Place":

					uri = `/places/${id}/`;

					break;

				case "Company":

					uri = `/companies/${id}/`;

					break;

			}

			Object.assign(item, {
				uri,
			});




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
			// this.forceUpdate();
			// this.setState({
			// 	clusters,
			// });

			this.recalculateMarkers();
		}
		else {

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

		const result = {
			minLat,
			maxLat,
			minLng,
			maxLng,
		};



		return result;
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
			Marker,
		} = this.props;

		const {
			map,
			maps,
			center,
			draggable,
			// clusters,
			// activePlaceItem,
			// sidebarOpen,
			mapItems,
			zoom,
			cluster_id,
			bounds,
			inited,
			expandAllCompanies,
			mapOptions,
			mapViewOptions,
			expanded,
			clusters,
		} = this.state;

		const {
			CoordsStore,
			// classes,
			user,
		} = this.context;


		const {
			user: currentUser,
		} = user || {};


		// const {
		// 	minLat,
		// 	maxLat,
		// 	minLng,
		// 	maxLng,
		// } = this.getScreenBounds() || {};

		const {
			...advBounds
		} = this.getScreenBounds(true) || {};


		let advItems = [];

		/*
			Router module
		*/
		if (children) {
			return <div
				style={{
					height: '100%',
				}}
			>
				{children}
			</div>
		}


		if (!inited) {
			return "null";
		}



		// 

		let {
			savePlaceItem,
		} = this.context;

		let items = [];


		const sizes = [200, 100, 50, 20, 10];





		mapItems && mapItems.map((cluster, index) => {

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


			if (item) {

				const {
					id,
					_type: typename,
					uri,
					icon: itemIcon,
				} = item;

				let icon;

				if (itemIcon) {
					icon = `/images/map-icon/${itemIcon}`;
				}
				else {
					icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gMcDB4FZwaw6gAAA4RJREFUWMPNmEtIVkEUx383nZKisIUtwiKKIoleUEESNF7dFBRCBBVlWCJRktIuWgQSUYsWZfag3FTQJrCVJsFw6UFBRAZh74IsRCokS3tctDbzweUy9/vu3HsDz+a735kz5/znzMx5jIMluZ6PkgLX86cAFcBaYL3+LgMcYAh4BdwD7gDPlRTfSUBOQnD7gWPADKCowLRxYBQ4q6Q4HNSTGcAAsBqgHVhEMvoMHFJSXIsL0rHw3j7gPNnQaSVFSxzBSYU8p38vZAgOoNn1/O6gjcQedD2/EbiY53w9AW4A3cAbzZsLVAE7gNVAScT8diVFU77tdgp4rwpQESIvABcYVFKM59ExDbgObIrQ06Ck6LDa4sCK2iLmtSkpKpQUA9pj+WhESbEZiDpzp1zPd6y32PX8XcAVw9A5JcUBm1ARiAJNEYvuUFI0xAboen4RMKADb5DeKSkW2IAzgLwObAsN/wLKlRRfC26xPjeLgZkGO1WANbjcHK17N/AjNFwCLI91BrXxVUBxaOgp8KlQWIgB9I9Of2GqNckXR+ipNvC6lRRjKcHlPi8BG0PDNTaBeqmB15NhoL5t4FXYACwz8N5mhU5JMRJXNgrgXyYIRQHsN/DmZWXU9XxT6vNtAD4w8GoydEx1TJuRALsMvE2u509KE2YCc01Z42YsgFrJS+B3aGgFMCtJkA7pLwZkiD0GKNPijYFaSfEReGdIiz1xargCBUg7UBoaHtZ9i1XBWm/gLXM9/0Qgbdnm4Xqg0SByUmeY2MVCTmFvRI48rqQ4UqgByi1C69oDmOq+b0qK0iTlFsBO4GqEyENggzbwN4+eyTq11UWItCopjiYCqFf+AZgTIeYDj4BrwC0lxXs9d7a+CHVAJTA9zwmYCvy0LvkDQBfqJvx/0FYlxY20Xd1r3RBlTc+AztRdnQY6DfiSpztLQkuUFH2p+uJQ9VGbYRHRoqToixOqbJ8+uvTNTUMfgPnAWNZPHzmQ/UB5QnC/dbocTltu5aMtKby3V0kxbJOFnCRWXM/fC1y2nHZGSdFs27I6CcDlPjujOjEDPQbWAOO21ZCT5rS7nn8XWBfjTXCekmI0iQ0nBThHl00vI5qs3KVYkmu4ktSSTsqQgev5M4FBwGR9pZKiN8lTSZpbHA49Q/oZLky704LLxIMBsJXAff33oJKibaK0rsGn4u2u57cmbQtM9A+ISmPmfHQaPAAAAABJRU5ErkJggg=="
				}

				items.push(
					<Marker
						position={{
							lat,
							lng,
						}}
						lat={lat}
						lng={lng}
						// key={`${typename}_${id}`} 
						// key={item ? `${id}_${type}_${index}` : `cluster_${zoom}_${items.length}`}
						key={`${id}_${type}`}
						// key={index}
						item={item}
						cluster={cluster}
						expanded={expanded.indexOf(id) !== -1}
						icon={icon}
						onClick={event => {

							// console.log("Marker item on click", event);

							let newExpanded = [...expanded];

							const index = newExpanded.indexOf(id);

							if (index === -1) {
								newExpanded.push(id);
							}
							else {
								newExpanded.splice(index, 1);
							}


							this.setState({
								expanded: newExpanded,
							});

						}}
					></Marker>
				);

			}
			else {

				const {
					properties: {
						point_count,
					},
				} = cluster;

				const sizeIndex = sizes.findIndex(n => n < point_count);



				let size = 1;

				if (sizeIndex !== -1) {
					size = sizes.length - sizeIndex;
				}

				let icon = `//cdn.rawgit.com/mahnunchik/markerclustererplus/master/images/m${size}.png`;
				// let icon = `//cdn.rawgit.com/mahnunchik/markerclustererplus/master/images/m5.png`;

				items.push(<Marker
					// key={`${typename}_${id}`} 
					// key={item ? `${id}_${type}_${index}` : `cluster_${zoom}_${items.length}`}
					key={`cluster_${lat.toFixed(3)}_${lng.toFixed(3)}`}
					position={{
						lat,
						lng,
					}}
					lat={lat}
					lng={lng}
					item={item}
					cluster={cluster}
					clusters={clusters}
					expandAllCompanies={expandAllCompanies}
					// label={{
					// 	color: "green",
					// }}
					label={(point_count || 0).toString()}
					onClick={event => {

					}}
					onDragStart={event => {

					}}
					onDragEnd={event => {

						this.forceUpdate()
					}}
					draggable={true}
					// opacity={0.5}
					// icon={{

					// }}
					icon={icon}
				/>);

			}

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
				position: "relative",
			}}
			spacing={0}
		>

			<NewMap
				mapKey={key}
				defaultCenter={mapOptions.center}
				defaultZoom={mapOptions.zoom}
				center={center} // current map center
				zoom={this.state.zoom} // current map zoom
				// ref="mapProvider"
				draggable={draggable}
				onGoogleApiLoaded={this.onGoogleApiLoaded}
				yesIWantToUseGoogleMapApiInternals={true}
				onChange={this.handleMapChange}
				onChildMouseEnter={this.onChildMouseEnter}
				onChildMouseLeave={this.onChildMouseLeave}
				onChildClick={this.onChildClick}
				options={mapViewOptions}
				markers={items}
				map={map}
				maps={maps}
			/>


		</Grid>

	}
} 