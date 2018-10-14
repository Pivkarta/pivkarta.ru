import React, { Component } from 'react'
import PropTypes from 'prop-types'

import URI from "urijs";

export default class UriProvider extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  static childContextTypes = {
    uri: PropTypes.object,
  };


  getChildContext() {
    const {
      router: {
        history,
      },
    } = this.context;

    const {
      location,
    } = history;

    let uri = new URI(history.createHref(location));

    // global.uri = uri

    return {
      uri,
    }

  }


  render() {


    const {
      children: {
        type: Type,
        props,
      },
    } = this.props;

    return <Type
      {...props}
    />

  }
}

