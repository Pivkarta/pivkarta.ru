import React, { Component } from 'react'
import PropTypes from 'prop-types'


import NativeSelect from '../../Native';

export default class BeerContainerSelect extends Component {

  static propTypes = {
    // prop: PropTypes
  }

  render() {

    const {
      ...other
    } = this.props;

    return (
      <NativeSelect
        name="container"
        label="Тара"
        helperText="Выберите из списка"
        {...other}
      >
        <option value=""></option>
        <option value="1">Бутылка</option>
        <option value="2">Банка</option>
        <option value="3">Пластиковая бутылка</option>
        <option value="4">Разливное</option>
      </NativeSelect>
    )
  }
}
