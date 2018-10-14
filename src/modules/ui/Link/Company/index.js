import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '../';

export default class CompanyLink extends Link {


  static propTypes = {
    ...Link.propTypes,
    withGeo: PropTypes.bool.isRequired,
  };


  static defaultProps = {
    ...Link.defaultProps,
    withGeo: false,
  }

  getUrl(){

    const {
      id,
    } = this.props;

    return `/companies/${id}/`;
  }

  // static propTypes = {
  //   prop: PropTypes
  // }

  // render() {
  //   return (
  //     <div>
        
  //     </div>
  //   )
  // }
}
