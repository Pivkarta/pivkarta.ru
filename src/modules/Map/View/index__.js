import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import PropTypes from 'prop-types';

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


import { MAP } from 'react-google-maps/src/constants'

import 'src/modules/map-sidebar-react/src/styles/styles.css';

import SideBar from './Sidebar';

class MapContainer extends Component {

  
  static contextTypes = {
    [MAP]: PropTypes.object,

    // Хак. Если передан массив, то выводим сайдбар
    mapItems: PropTypes.array,
  };

  render() {

    const {
      ...other
    } = this.props;

    const {
      mapItems,
    } = this.context;

    // return <div
    //   style={{
    //     height: `100%`,
    //     width: "100%",
    //   }}
    // >
    //   {/* <div
    //     style={{
    //       height: `100%`,
    //       width: "100%",
    //       zIndex: 2,
    //       position: "absolute",
    //     }}
    //   >
    //     sdfsdf
    //   </div> */}
    //   <div
    //     style={{
    //       height: `100%`,
    //       width: "100%",
    //       zIndex: 100,
    //       position: "absolute",
    //     }}
    //     {...other}
    //     ref={wrapper => {


    //       if(!wrapper){
    //         return false;
    //       }

    //       const container = wrapper.querySelector(".gm-style");



    //       if(!container){
    //         return false;
    //       }

    //       // container.appendChild(<div
    //       //   class="test"
    //       // >
    //       //   dsfsdf
    //       // </div>);

    //       const div = document.createElement('div');
    //       const div2 = document.createElement('div');

    //       div.className="test";
    //       div.style = `
    //         position:  absolute;
    //         width: 300px;
    //         height:  200px;
    //         border: 1px solid;
    //         background: green;
    //         z-index: 0;
    //       `
          
    //       div.innerHTML = "sdfsdfdsf";
          
    //       div2.className="test2";
    //       div2.innerHTML = "sdfsdfdsf";

    //       div.appendChild(div2);

    //       container.appendChild(div);

    //     }}
    //   >
        
    //   </div>
    // </div>


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
      /> : null}

      <div
        style={{
          height: `100%`,
          width: "100%",
          zIndex: 0,
          position: "absolute",
        }}
        {...other} 
      />   
    </div>
  }

}


class MapsProvider extends Component {


  static contextTypes = {
    [MAP]: PropTypes.object,
  };


  render() {

    const {
      [MAP]: map,
    } = this.context || {};

    const {
      maps,
    } = global.google || {};

    if (!maps || !map) {
      return null;
    }

    const {
      children,
    } = this.props;

    if (children) {

      if (Array.isArray(children)) {
        return <Fragment>
          {children.map((n, index) => <n.type
            key={index}
            maps={maps}
            map={map}
            {...n.props}
          />)}
        </Fragment>
      }
      else {
        return <children.type
          maps={maps}
          map={map}
          {...children.props}
        />
      }

    }
    else {
      return null;
    }

  }

}

export default class NewGoogleMapView extends Component {

  static contextTypes = {
    googleMapApiKey: PropTypes.string.isRequired,
  }


  state = {}


  componentWillMount() {

    const {
      googleMapApiKey: mapKey,
    } = this.context;

    let url = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`;



    this.Renderer = compose(

      withProps({
        googleMapURL: url,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <MapContainer />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => {



      const {
        onMapMounted,
        markers,
        children,
        ...other
      } = props;


      return <GoogleMap
        // defaultZoom={8}
        options={{
          disableDefaultUI: true,
        }}
        {...other}

        ref={component => {

          onMapMounted(component);
        }}
      // ref="map"
      >
        {markers}

        {children ? <MapsProvider>
          {children}
        </MapsProvider>
          :
          null}

      </GoogleMap>

    });

  }


  render() {

    const {
      mapKey,

      center,
      zoom,
      ref,
      // draggable,
      onGoogleApiLoaded,
      yesIWantToUseGoogleMapApiInternals,
      onChange,
      onChildMouseEnter,
      onChildMouseLeave,
      options,

      markers,
      ...other
    } = this.props;

    const {
      Renderer,
    } = this;






    return (
      <Renderer
        {...other}

        markers={markers}
        ref={component => {

        }}
        onChange={a => {


        }}
        onBoundsChanged={(a, b, c) => {





          // handleMapChange = ({ center, zoom, bounds })

          if (onChange) {

            // onChange();

            const {
              map,
            } = this.state;


            let center = map.getCenter();
            const zoom = map.getZoom();
            let bounds = map.getBounds();

            const {
              lat,
              lng,
            } = center;

            center = {
              lat: lat(),
              lng: lng(),
            }





            if (bounds) {


              let sw = bounds.getSouthWest();
              let ne = bounds.getNorthEast();

              let {
                lat: swLat,
                lng: swLng,
              } = sw;

              sw = {
                lat: swLat(),
                lng: swLng(),
              }

              let {
                lat: neLat,
                lng: neLng,
              } = ne;

              ne = {
                lat: neLat(),
                lng: neLng(),
              }


              let nw = {
                lat: neLat(),
                lng: swLng(),
              }

              let se = {
                lat: swLat(),
                lng: neLng(),
              }

              bounds = {
                sw,
                ne,
                nw,
                se,
              };

            }

            onChange({ center, zoom, bounds });






          }

        }}
        onMapMounted={(map) => {

          if (this.state.map) {
            return;
          }



          this.state.map = map;

          this.forceUpdate();


        }}
      />
    )
  }
}
