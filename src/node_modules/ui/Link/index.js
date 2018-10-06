import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

export default class UiLink extends Component {

  static propTypes = {
    // prop: PropTypes
  }


  getUrl() {
    return "javascript:;";
  }


  render() {

    const {
      children,
      ...other
    } = this.props;

    const url = this.getUrl();

    return (
      url
        ?
        <Link
          to={url}
          // activeClassName="fdgdgfd"
          {...other}
        >
          {children}
        </Link>
        :
        <Fragment>
          {children || null}
        </Fragment>
    )
  }
}
