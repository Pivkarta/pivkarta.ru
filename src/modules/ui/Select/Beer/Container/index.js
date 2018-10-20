import React, { Component } from 'react'
import PropTypes from 'prop-types'


import NativeSelect from '../../Native';

export default class BeerContainerSelect extends Component {

  static propTypes = {
    // prop: PropTypes
  }


  // onChange(event) {

  //   const {
  //     onChange,
  //   } = this.props;

  //   if (!onChange) {
  //     return false;
  //   }
    
  //   let {
  //     value,
  //   } = event.target;
    
  //   event.target.value = value && parseInt(value) || null;

  //   return onChange(event);
  // }


  render() {

    const {
      // onChange,
      ...other
    } = this.props;

    return (
      <NativeSelect
        name="container"
        label="Тара"
        helperText="Выберите из списка"
        onChange={event => this.onChange(event)}
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
