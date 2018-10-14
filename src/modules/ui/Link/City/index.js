import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '../';

export default class CityLink extends Link {


  static propTypes = {
    ...Link.propTypes,
    object: PropTypes.object.isRequired,
  };
 
  getUrl(){

    const {
      object,
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      id,
      name,
      coords,
      alias,
      // uri,
      lat,
      lng,
    } = object;


    const url = `/${alias}/@` + [lat, lng, 12].join(",");

    return url;
  }
 
}
