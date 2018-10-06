import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom"

class BeerMapLink extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {

    const {
      item,
      children,
      ...other
    } = this.props;


    if (!item) {
      return null;
    }

    const {
      beer_id,
      name,
    } = item;

    return (
      beer_id && name ?
        <Link
          to={`/map/?beer_id=${beer_id}&beer=${name}`}
          className="mui-btn mui-btn--primary"
          title={`Найти пиво "${name}" на карте города`}
          {...other}
        >
          <i className="fas fa-beer"></i> {children || "Показать на карте"}
        </Link>
        : null
    );
  }
}


export default BeerMapLink;