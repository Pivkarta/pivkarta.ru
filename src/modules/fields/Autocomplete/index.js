import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from 'src/modules/autocomplete';

export default class AutocompleteField extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <Autocomplete 
        {...this.props}
      />
    )
  }
}
