import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
  topicsConnection,
} from "src/modules/query";
import { compose, graphql } from 'react-apollo';


import View from "./View";


class MainPageTopics extends Component {


  static defaultProps = {
    View,
  }

  render() {


    const {
      View,
      ...other
    } = this.props;

    return (
      <View
        {...other}
      />
    );
  }
}

export default compose(graphql(topicsConnection, {
  // options: props => {


  //   return {
  //     ...props,
  //     variables: {
  //       first: 8
  //     },
  //   }
  // },
}))(MainPageTopics);