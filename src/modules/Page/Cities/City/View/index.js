import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlacesView from "src/modules/Page/Places/View";

export default class CityView extends PlacesView {

  static propTypes = {
    ...PlacesView.propTypes,
    city: PropTypes.object.isRequired,

  };

  static contextTypes = {
    ...PlacesView.contextTypes,
    setGeoCoords: PropTypes.object.isRequired,

  };

  // render() {
  //   return (
  //     <div>
  //       CityView
  //     </div>
  //   );
  // }


  componentWillMount() {

    this.setCoords();

    super.componentWillMount && super.componentWillMount();
  }


  setCoords() {

    if (typeof window === "undefined") {
      const {
        setGeoCoords,
      } = this.context;

      const {
        city: {
          object,
        },
      } = this.props


      const {
        lat,
        lng,
      } = object || {}




      if (lat && lng) {
        setGeoCoords({
          lat,
          lng,
        }, true);

      }
    }

  }
}


