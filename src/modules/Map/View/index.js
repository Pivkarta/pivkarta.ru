import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GoogleMapReact from 'google-map-react';


import 'src/modules/map-sidebar-react/src/styles/styles.css';

import SideBar from './Sidebar';

export default class MapView extends Component {

  static propTypes = {
    // map: PropTypes.object.isRequired,
    // maps: PropTypes.object.isRequired,
  }

  static contextTypes = {
    googleMapApiKey: PropTypes.string.isRequired,
    mapItems: PropTypes.array,
  }


  render() {

    const {
      markers,
      children,
      map,
      maps,
      ...other
    } = this.props;

    const {
      googleMapApiKey,
      mapItems,
    } = this.context;





    return <div
      style={{
        height: `100%`,
        width: "100%",
      }}
    >
      {/* <div
        style={{
          zIndex: 1,
          position: "absolute",
          border: "1px solid",
          padding: 5,
          height: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
          }}
        >
          dsfdsfdsfsdfsdf
        </div>
      </div> */}

      {mapItems ? <SideBar
        map={map}
        maps={maps}
      /> : null}

      <div
        style={{
          height: `100%`,
          width: "100%",
          zIndex: 0,
          // position: "absolute",
          // position: "relative"
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: [googleMapApiKey],
            // v: '3.31',
          }}
          {...other}
        >
          {markers}
          {children}
        </GoogleMapReact>
      </div>   
    </div>

    // return (
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ 
    //       key: [googleMapApiKey],
    //       // v: '3.31',
    //     }}
    //     {...other}
    //   >
    //     {markers}
    //     {children}
    //   </GoogleMapReact>
    // )

    // return (
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ key: [googleMapApiKey] }}
    //     {...other}
    //   >
    //   </GoogleMapReact>
    // )
  }
}
