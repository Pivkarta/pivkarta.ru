import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Image from '../';

export default class PlaceImage extends Component {

  static propTypes = {
    // is_bar: PropTypes.bool.isRequired,
    // is_shop: PropTypes.bool.isRequired,
    // is_brewery: PropTypes.bool.isRequired,
  }

  render() {

    let {
      src,
      // is_bar,
      // is_shop,
      // is_brewery,
      ...other
    } = this.props;

    // Если картинка отсутствует, задаем базовую

    // if(!src){

    //   if (is_bar){
    //     src = '13/78/88/94/81/66/21/8fd1f3a41b7213819d82d3aad58f2fe5.jpeg';
    //   }
    //   else if (is_shop){
    //     src = '13/78/88/95/04/19/27/82f5b7c1e37d1347368cfe86a5a5dafe.jpeg';
    //   }
    //   else if (is_brewery){
    //     src = '13/78/88/94/19/11/35/e84bb049a9deca4fbad2ddbbef7477a6.jpeg';
    //   }
    // }

    return (
      <Image
        {...other}
        src={src}
      />
    )
  }
}
