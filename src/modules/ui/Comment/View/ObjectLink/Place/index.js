import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import CommentObject from '../';

import {
  placeByPlaceId,
} from 'src/modules/query';

import PlaceLink from 'src/modules/ui/Link/Place';

export class CommentPlace extends CommentObject {

  static propTypes = {
    place_id: PropTypes.number.isRequired,
  }

  render() {

    const {
      data,
    } = this.props;
    
    const {
      object,
    } = data || {};

    if(!object){
      return null;
    }

    // const {
    //   id,
    //   name,
    // } = object;

    return super.render(
      <PlaceLink
        object={object}
      />
    )
  }
}

export default compose(
  graphql(placeByPlaceId, {
    // name: 'items', 
  }),

)(CommentPlace);