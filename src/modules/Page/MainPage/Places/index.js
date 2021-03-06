import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
  // mapPlacesConnection,
  placesConnection,
} from "src/modules/query";
import { compose, graphql } from 'react-apollo';


import View from "./View";


class MainPagePlaces extends Component {


  static defaultProps = {
    View,
  }

  render() {


    const {
      View,
      ...other
    } = this.props;

    return (
      <View
        {...other}
      />
    );
  }
}

// export default compose(graphql(mapPlacesConnection, {
export default compose(graphql(placesConnection, {
  // options: props => {


  //   return {
  //     ...props,
  //     variables: {
  //       first: 8
  //     },
  //   }
  // },
}))(MainPagePlaces);