import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List
  from 'material-ui/List';

import Item from '../Item';

import Image from "src/modules/ui/Image";

export default class ItemsPanelBeers extends Component {


  static propTypes = {
    beersConnection: PropTypes.object,
  }

  render() {

    const {
      beersConnection,
    } = this.props;

    const {
      // aggregate,
      edges,
    } = beersConnection || {};


    if (!edges || !edges.length) {
      return null;
    }


    let beers = edges.map(({ node }) => node);

    return (
      <List>
        {beers.map(n => {

          const {
            id,
            name,
            image,
            uri,
          } = n;

          return <Item
            key={id}
            primaryText={name}
            href={uri}
            image={image ? <Image
              src={image}
              type="dot_thumb"
            /> : undefined}
          />

        })}
      </List>
    )
  }
}
