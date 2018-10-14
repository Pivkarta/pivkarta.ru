import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom';

export default class BeerLink extends Component {

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

    const {
      id,
      beer_id,
      name,
      url_name,
    } = object;

    const url = `/beer/${beer_id}/${url_name}/`;

    return (
      <Link
        to={url}
        href={url}
        {...other}
      >
        {name}
      </Link>
    )
  }
}
