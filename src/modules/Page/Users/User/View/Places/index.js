
/**
 * Заведения, созданные пользователем
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  placesConnection,
} from "src/modules/query";

import { compose, graphql } from 'react-apollo';

import View from './View';

export class UserPlaces extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
  }

  render() {

    const {
      ...other
    } = this.props;

    return (
      <View 
        {...other}
      />
    )
  }
}



export default graphql(placesConnection, {
  options: props => {


    const {
      user: {
        id: userId,
      },
    } = props;

    return {
      variables: {
        first: 100,
        where: {
          Owner: {
            id: userId,
          },
        },
      },
    };
  },
})(UserPlaces);
