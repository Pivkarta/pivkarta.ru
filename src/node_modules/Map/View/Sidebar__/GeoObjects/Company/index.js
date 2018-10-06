import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Connector from './connector';

export default class SideBarCompany extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  static defaultProps = {

    companyGetParent: true,
    companyGetAdvButtons: true,
    companyGetPlace: false,
    companyGetChilds: false,

  }

  render() {
    return <Connector
      {...this.props}
    />
  }
}
