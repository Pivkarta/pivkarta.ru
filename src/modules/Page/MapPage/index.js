import React, { Component } from 'react';

import PropTypes from 'prop-types';
 

import { graphql, compose } from 'react-apollo';

import {
  mapGeoObjectsConnection,
} from 'src/modules/query';

import ReactCmsMap from 'src/modules/ReactCMS/components/Map';

import Marker from '../../Marker';

import URI from 'urijs';

import Page from '../layout';

export class MapPage extends Page {

	static propTypes = {
		...Page.propTypes,
		onChildMouseMove: PropTypes.func,
		defaultCenter: PropTypes.object.isRequired,
		defaultZoom: PropTypes.number.isRequired,
		mapSearchQuery: PropTypes.string.isRequired,
		mapBeerSearchQuery: PropTypes.string.isRequired,
		mapBeerIdSearchQuery: PropTypes.string.isRequired,
	};


	static defaultProps = {
		...Page.defaultProps,
		defaultZoom: 12,
		defaultCenter: {
			lat: 55.75,
			lng: 37.62,
		},
	};

	static contextTypes = {
		...Page.contextTypes,
		googleMapApiKey: PropTypes.string.isRequired,
	};


	static childContextTypes = {
		...Page.childContextTypes,
		mapSearch: PropTypes.func,
		mapSearchQuery: PropTypes.string,
		mapBeerSearchQuery: PropTypes.string,
		mapBeerIdSearchQuery: PropTypes.string,
	}

	constructor(props) {

		super(props);

		this.state = {
			draggable: true,
		}
	}


	getChildContext(){
		
		const {
			mapSearchQuery,
			mapBeerSearchQuery,
			mapBeerIdSearchQuery,
		} = this.props;


		const parentContexts = super.getChildContext ? super.getChildContext() : {}

		return {
			...parentContexts,
			mapSearchQuery,
			mapBeerSearchQuery,
			mapBeerIdSearchQuery,
			mapSearch: this.mapSearch,
		}

	}


  componentWillMount(){
 
    this.setPageMeta({
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    });

  }


	mapSearch = (value, field = "src/modules/query") => {



		const {
			history,
		} = this.props;


		const {
			location,
		} = history;

		const {
			pathname,
			search,
		} = location;

		let uri = new URI(pathname).query(search);

		let query = uri.query(true);

		Object.assign(query, {
			[field]: value || undefined,
		});

		if(field === "beer"){
			query.beer_id = undefined;
		}




		uri.query(query);



		history.push(uri.toString());

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

		let {

			onChildMouseMove,
		} = this.props;


		return onChildMouseMove ? onChildMouseMove(key, marker, newCoords) : false;
	}

	onGoogleApiLoaded(api) {

		let {
			map,
			maps,
		} = api;

		this.setState(api);
	}


	render(){

		const {
			data,
			...other
		} = this.props;

		const {
			// mapData,
		} = this.state;

		const {
			loading,
			mapData,
		} = data || {}


		if(!mapData){
			return null;
		}

		return <ReactCmsMap
			mapData={mapData.objects || []}
			loading={loading}
			Marker={Marker}
			{...other}
		/>;

	}

}

export default compose(
	graphql(mapGeoObjectsConnection, {
		// name: 'items', 
	}),
)(MapPage);
