import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
  commentsConnection,
} from "src/modules/query";
import { compose, graphql } from 'react-apollo';


import View from "./View";


class MainPageComments extends Component {


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

export default compose(graphql(commentsConnection, {
  options: props => {


    return {
      variables: {
        first: 4,
        commentGetAuthor: true,
        orderBy: "createdAt_DESC",
        ...props,
      },
    }
  },
}))(MainPageComments);