import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../../layout';

import { compose, graphql } from 'react-apollo';

import {
  comment,
  // updateCommentProcessor,
} from "src/modules/query";

import View from "src/modules/ui/Comment/View";

export class CommentPage extends Page {

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  render(content) {

    const {
      user: currentUser,
    } = this.context;

    // if (!currentUser || currentUser.sudo !== true) {
    //   return null;
    // }


    if (content === undefined) {
      const {
        View,
        ...other
      } = this.props;

      content = <View
        {...other}
      />;
    }


    return super.render(
      content
    )
  }
}

export default compose(graphql(
  comment,
  {
    options: props => {

      // const {
      //   variables,
      //   ...other
      // } = props;



      return {
        variables: {
          commentGetAuthor: true,
          ...props,
        },
      }
    },
  }
), 
// graphql(
//   updateCommentProcessor,
//   )
)(CommentPage);