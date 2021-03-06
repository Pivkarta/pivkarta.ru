import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'

// import Image from 'src/modules/fields/Image';
// import Image from 'src/modules/fields/image';

import {
  place,
} from 'src/modules/query';

import View from './View';


export class ExpandedCompany extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {



    // return null;

    const {
      data: {
        object: item,
      },
      ...other
    } = this.props;


    if (!item) {
      return null;
    }

    return <View
      {...other}
      item={item}
    />

    // const {
    //   id,
    //   gallery,
    // } = item;

    // const image = gallery ? gallery[0] : null;

    // return (
    //   <div
    //     {...other}
    //   >
    //     {image}
    //     ExpandedCompany
    //   </div>
    // )
  }
}

export default graphql(place, {
  options: props => {

    const {
      item: {
        id,
      },
    } = props;



    return {
      variables: {
        id,
      },
    };

  },
})(ExpandedCompany);
