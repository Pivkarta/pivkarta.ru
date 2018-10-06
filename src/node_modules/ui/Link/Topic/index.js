import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '../';

export default class TopicLink extends Link {


  static propTypes = {
    ...Link.propTypes,
    object: PropTypes.object.isRequired,
  };


  // static defaultProps = {
  //   ...Link.defaultProps,
  // }

  getUrl(){

    const {
      object,
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      id,
      topic_id,
      url_name,
      // name,
    } = object;

    const url = url_name ? `/topics/${url_name}/` : topic_id ? `/blog/show/${topic_id}/` : null;

    return url;
  }
 
}
