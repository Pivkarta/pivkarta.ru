import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WebSite extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
  };

  render() {

    const {
      object,
    } = this.props;

    const {
      website,
    } = object || {};


    if (!website) {
      return null;
    }

    return (
      <a
        href={website}
        rel="nowollow"
        target="_blank"
      >
        {website}
      </a>
    );
  }
}


export default WebSite;