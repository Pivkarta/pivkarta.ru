import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Map from 'src/modules/fields/Map';

export default class PlaceMap extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    updateObject: PropTypes.func,
  }


  state = {}

  constructor(props) {

    super(props);

    const {
      item,
    } = props;

    let {
      // coords,
      lat,
      lng,
    } = item || {};


    if (!lat || !lng) {
      lat = 55.75;
      lng = 37.61;
    }



    const defaultCenter = {
      lat,
      lng,
    };

    Object.assign(this.state, {
      defaultCenter,
    });



  }


  // shouldComponentUpdate(){

  //   return false;

  // }


  render() {

    const {
      item,
      updateObject,
      inEditMode,
      ...other
    } = this.props;


    if (!item) {
      return null;
    }


    const {
      defaultCenter,
    } = this.state;


    // let {
    //   // coords,
    //   lat,
    //   lng,
    // } = item || {};

    // const {
    //   lat,
    //   lng,
    // } = coords || {};

    // if (!lat && !lng && defaultCenter && inEditMode) {
    //   lat = defaultCenter.lat;
    //   lng = defaultCenter.lng;
    // }

    // console.log('inEditMode', inEditMode, lat, lng, defaultCenter);


    // let marker;

    // if(lat && lng){
    //   marker = <div
    //     lat={lat}
    //     lng={lng}
    //   >
    //     ddd
    //   </div>
    // }


    return (
      <div
        style={{
          marginTop: 30,
        }}
      >
        <Map
          inEditMode={inEditMode}
          defaultCenter={defaultCenter}
          // center={defaultCenter}
          // center={{
          //   lat,
          //   lng,
          // }}
          item={item}
          defaultZoom={16}
          updateObject={updateObject}
          onSearchSelect={updateObject ? (event, element, coords, maps, map) => {



            const {
              lat,
              lng,
            } = coords || {};

            if (lat && lng) {


              const LatLng = new maps.LatLng(coords)

              map.setZoom(15);

              map.panTo(LatLng);




              updateObject({
                // dsfg: "DSfsdf",
                lat,
                lng,
                // coords: {
                //   lat,
                //   lng,
                // },
                // coords: null,
              });

            }

          } : undefined}
          options={{
            scrollwheel: false,
          }}
          {...other}
        >
          {/* {marker} */}
        </Map>
      </div>
    )
  }
}
