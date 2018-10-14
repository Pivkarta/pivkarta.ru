import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from 'src/modules/autocomplete'

export default class YandexAutocomplete extends Component {

  static contextTypes = {
    ymaps: PropTypes.object,
  }


  constructor(props) {

    super(props);

    const {
      value = "",
    } = props;

    this.state = {
      value,
    };

  }


  async loadData() {

    const {
      value: searchText,
    } = this.state;



    // const {
    // 	localQuery,
    // } = this.context;


    let {
      ymaps,
    } = this.context;

    if (!ymaps) {
      throw("ymaps context required");
      return false;
    }

    let dataSource = [];

    if (searchText) {

      await ymaps.geocode(searchText)
        .then(
          res => {



            res.geoObjects.each(geoObject => {



              const allProperties = geoObject.properties.getAll();



              let {
                name,
                text,
                description,
                metaDataProperty: {
                  GeocoderMetaData,
                },
                geometry,
                ...other
              } = allProperties

              let {
                geometry: {
                  _coordinates: coordinates,
                },
              } = geoObject;





              dataSource.push({
                value: GeocoderMetaData.id,
                // label: name,
                // formattedName: text,
                label: text,
                coordinates,
              });
            });

          }
        );

    }




    this.setState({ dataSource });

    return;
  }


  render() {

    const {
      onSelect,
      ...other
    } = this.props;

    const {
      value,
      dataSource,
    } = this.state;

    return (
      <Autocomplete
        value={value || ""}
        items={dataSource || []}
        onChange={(event, value) => {

          // const {
          //   value,
          // } = event.target;



          this.setState({ value }, () => {
            this.loadData();
          });
        }}
        onSelect={(value, item) => {
          
          onSelect && onSelect(value, item);



          this.setState({ value });
        }}
        {...other}
      />
    )
  }
}
