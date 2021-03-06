import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import CommentObject from '../';

import {
  topic,
} from 'src/modules/query';


import TopicLink from "src/modules/ui/Link/Topic";

export class CommentTopic extends CommentObject {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {

    const {
      data,
    } = this.props;

    const {
      object,
    } = data || {};

    if (!object) {
      return null;
    }

    const {
      // id,
      name,
    } = object;

    return super.render(
      <TopicLink
        object={object}
      >
        {name}
      </TopicLink>
    )
  }
}

export default compose(
  graphql(topic, {
    // name: 'items', 
  }),

)(CommentTopic);