
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import View from './View';

export default class NewMap extends Component {
  static propTypes = {
    // prop: PropTypes
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
