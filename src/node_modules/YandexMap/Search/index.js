import React, {Component} from 'react';

import PropTypes from 'prop-types';

// import AutoComplete from 'material-ui-components/src/AutoComplete';
// import YandexAutoCompletePrototype from 'material-ui-components/src/YandexAutoComplete';
// import {
// 	YaAutoComplete,
// } from 'material-ui-components/src/YandexAutoComplete';

import YaAutoComplete from '../../YandexAutoComplete';

import Grid from 'material-ui/Grid';



// import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';

import { YMaps} from 'react-yandex-maps';
 

const yaContext = Object.assign({
	localQuery: PropTypes.func.isRequired,
}, YaAutoComplete.contextTypes || {});

// class YandexAutoComplete extends YandexAutoCompletePrototype{
class YandexAutoCompleteInner extends YaAutoComplete{

	static contextTypes = yaContext;

	// static contextTypes = {
	// 	localQuery: PropTypes.func.isRequired,
	// };

	// loadData(){



	// 	// return super.loadData && super.loadData();
	//  } 


  async loadData(){



    const {
    	localQuery,
    } = this.context;


    let {
      searchText,
    } = this.state;

    let {
    	ymaps,
    } = this.props;

    if (!ymaps || !searchText.length) {
      return false;
    }
    
		let dataSource = [];

 		await ymaps.geocode(searchText)
 		.then(
 			res => {



 				res.geoObjects.each(geoObject => {


 					let {
 						name,
 						text,
 						description,
 						metaDataProperty: {
 							GeocoderMetaData,
 						},
 						geometry,
 						...other
 					} = geoObject.properties.getAll();

 					let {
 						geometry: {
 							_coordinates: coordinates,
 						},
 					} = geoObject;





 					dataSource.push({
 						id: GeocoderMetaData.id,
 						name: name,
 						formattedName: text,
 						coordinates,
 					});
 				});

 			}
 		);


 		await localQuery({
 			operationName: "Search",
 			variables: {
 				searchQuery: searchText,
 			},
 		})
 		.then(r => {

 			const {
 				search,
 			} = r.data;

 			search && search.map(n => {

 				const {
 					id,
 					name,
 					coords,
 					extended,
 				} = n;

 				if(!coords){
 					return;
 				}

 				const {
 					gallery,
 				} = extended || {};

 				const image = gallery && gallery[0];

 				// return;

 				dataSource.unshift({
					id: id,
					name: name,
					formattedName: <Grid
						key={id}
						container
						align="center"
						spacing={0}
						style={{
							flexWrap: "nowrap",
						}}
					>

						{image && <Grid
							item
						>
							<img 
								src={image}
								style={{
									height: 60,
									width: 60,
									borderRadius: "50%",
								}}
							/>	
						</Grid>
						 || ""}

						<Grid
							item
						>
							{name}
						</Grid>
					</Grid>,
					coordinates: [coords.lat, coords.lng],
					zoom: 17,
				});

 			});



 		})
 		.catch(e => {
 			console.error(e);
 		});
		
		this.setState({dataSource});

		return;
  }



  cleanupProps(props){

		let {
			includeSiteData,
			...other
		} = props;

		return other;
	}


	componentWillUpdate(nextProps, nextState){



		return super.componentWillUpdate ? super.componentWillUpdate(nextProps, nextState) : true;
	}

	// componentDidUpdate(prevProps, prevState){

	// }
}

const defaultProps = {}



class YandexAutoComplete extends Component{

	cleanupProps(props){

		let {
			...other
		} = props;

		return other;
	}

	render(){

		let props = this.cleanupProps(this.props);



		return <YMaps
			children={function(ymaps){
				return <YandexAutoCompleteInner 
					ymaps={ymaps}
					// map={map}
					// google={google}
					// onChange={event => {

					// }}
					// onUpdateInput={event => {

					// }}
					{...props}
					// onNewRequest={(event, value, item) => {


				 //  	let {
				 //  		coordinates,
				 //  	} = item;



				 //  	map.setCenter(new google.maps.LatLng(coordinates[0],coordinates[1]));
					// }}
				/>
			}}
		>
	  </YMaps>;
	}
}

 
export default class YandexSearch extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	// componentWillMount(){

	// }

	// componentDidMount(){

	// }

 //  componentDidUpdate(){

 //    if(this.props.debug){

 //    }
 //  }

	render(){

		let {
			map,
			maps,
			// google,
			onNewRequest,
			includeSiteData,
			...other
		} = this.props;

		return <YandexAutoComplete
			includeSiteData={includeSiteData}
			closeOnBlur={false}
			map={map}
			maps={maps}
			// google={google}
			onNewRequest={(event, value, item) => {
		  	let {
		  		coordinates,
		  		zoom,
		  	} = item;

		  	// map.setCenter(new google.maps.LatLng(coordinates[0],coordinates[1]));
		  	map.setCenter(new maps.LatLng(coordinates[0],coordinates[1]));

	  		map.setZoom(zoom || 12);

		  	onNewRequest && onNewRequest(event, value, item);
			}}
			{...other}
		/>
	}
}

YandexSearch.defaultProps = defaultProps;

YandexSearch.propTypes = {
	map: PropTypes.object.isRequired,
	maps: PropTypes.object.isRequired,
	// google: PropTypes.object.isRequired,
}
