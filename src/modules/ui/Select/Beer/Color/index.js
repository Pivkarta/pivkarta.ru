import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NativeSelect from '../../Native';

export default class BeerColorSelect extends Component {

  static propTypes = {
    // prop: PropTypes
  }

  render() {

    const {
      ...other
    } = this.props;

    return (
      <NativeSelect
        name="color"
        label="Цвет"
        helperText="Выберите из списка"
        {...other}
      >
        <option value=""></option>
        <option>Светлое</option>
        <option>Темное</option>
        <option>Полутемное</option>
      </NativeSelect>
    )
  }
}
