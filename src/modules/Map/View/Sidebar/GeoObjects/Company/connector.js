import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { graphql } from 'react-apollo'

import {
  company,
} from '../../../../../../components/App/constants/queries';

import View from './View';


export class CompanyConnector extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {

    const {
      data: {
        loading,
        object,
      },
    } = this.props;


    if (!object || loading) {
      return null;
    }

    return (
      <View
        item={object}
      />
    )

  }
}


export default graphql(company)(CompanyConnector);