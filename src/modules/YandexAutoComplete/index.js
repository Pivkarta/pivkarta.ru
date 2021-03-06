import React, {Component} from 'react';

import PropTypes from 'prop-types';

// import AutoComplete from '../AutoComplete';

// import AutoComplete from 'material-ui/AutoComplete';

import AutoComplete from 'src/modules/Autocomplete';

import { YMaps} from 'react-yandex-maps';


let defaultProps = Object.assign({...AutoComplete.defaultProps}, {
  suggestions: [
    // { label: 'Afghanistan' },
    // { label: 'Aland Islands' },
    // { label: 'Albania' },
    // { label: 'Algeria' },
    // { label: 'American Samoa' },
    // { label: 'Andorra' },
    // { label: 'Angola' },
    // { label: 'Anguilla' },
    // { label: 'Antarctica' },
    // { label: 'Antigua and Barbuda' },
    // { label: 'Argentina' },
    // { label: 'Armenia' },
    // { label: 'Aruba' },
    // { label: 'Australia' },
    // { label: 'Austria' },
    // { label: 'Azerbaijan' },
    // { label: 'Bahamas' },
    // { label: 'Bahrain' },
    // { label: 'Bangladesh' },
    // { label: 'Barbados' },
    // { label: 'Belarus' },
    // { label: 'Belgium' },
    // { label: 'Belize' },
    // { label: 'Benin' },
    // { label: 'Bermuda' },
    // { label: 'Bhutan' },
    // { label: 'Bolivia, Plurinational State of' },
    // { label: 'Bonaire, Sint Eustatius and Saba' },
    // { label: 'Bosnia and Herzegovina' },
    // { label: 'Botswana' },
    // { label: 'Bouvet Island' },
    // { label: 'Brazil' },
    // { label: 'British Indian Ocean Territory' },
    // { label: 'Brunei Darussalam' },
  ],
});


export class YaAutoComplete extends Component{

  static defaultProps = defaultProps;


  state = {};
  
  constructor(props){

    super(props);

    let {
      suggestions,
    } = props;

    Object.assign(this.state, {
      suggestions,
    });

  }


  loadData(){



    let {
      searchText,
    } = this.state;

    let {
    	ymaps,
    } = this.props;

    if (!ymaps || !searchText.length) {
      return false;
    }
    
 		ymaps.geocode(searchText).then(
 			res => {


 				let dataSource = [];

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
 						label: name,
 						formattedName: text,
 						coordinates,
 					});
 				});

 				this.setState({
          suggestions: dataSource,
        });
 			}
 		)
  }


	cleanupProps(props){

		let {
			ymaps,
			map,
			google,
			...other
		} = props;

		return super.cleanupProps(other);
  }


  onChange(event){



    const {
      value,
    } = event.target;

    this.setState({
      searchText: value,
    }, () => this.loadData());

  }

  
  render(){

    const {
      ...other
    } = this.props;
    
    
    const {
      suggestions,
    } = this.state;



    return <AutoComplete
      onChange={event => this.onChange(event)}
      {...other}
      suggestions={suggestions}
    />
  }
}

YaAutoComplete.propTypes = {
	ymaps: PropTypes.object,
};

export default class YandexAutoComplete extends Component{

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
				return <YaAutoComplete 
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