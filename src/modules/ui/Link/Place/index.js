import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom';

export default class PlaceLink extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
  }

  render() {

    const {
      object,
      ...other
    } = this.props;

    if(!object){
      return null;
    }

    let {
      id,
      place_id,
      name,
      url_name,
      uri,
    } = object;

    // const url = `/moskva/place/show/${place_id}/${url_name}/`;
    uri = uri || `/place/${place_id}/${url_name}/`;

    if(!uri){
      return name;
    }

    return (
      <Link
        to={uri}
        {...other}
      >
        {name}
      </Link>
    )
  }
}
