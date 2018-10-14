import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Places from "src/modules/Page/MainPage/Places";

import View from "./View";

class BeerPlacesBlock extends Component {


  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {

    const {
      item
    } = this.props;

    const {
      id: beerId,
    } = item;

    if (!beerId) {
      return null;
    }

    return (
      <Places
        // center={{
        //   lat: 55.752,
        //   lng: 37.621,
        // }}
        item={item}
        View={View}
        first={6}
        orderBy="createdAt_DESC"
        where={{
          active: true,
          image_not: true,
          beers_some: {
            Beer: {
              id: beerId,
            },
          }
        }}
      />
    );
  }
}

BeerPlacesBlock.propTypes = {

};

export default BeerPlacesBlock;