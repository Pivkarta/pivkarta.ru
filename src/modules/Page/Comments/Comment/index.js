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



  setPageMeta(meta) {

    const {
      data: {
        object: comment,
      },
    } = this.props;


    if (!comment) {
      return;
    }

    const {
      // CommentTarget: Topic,
      name,
      uri,
      editor_content,
    } = comment;

    // const {
    //   name: topicName,
    //   longtitle,
    // } = Topic || {};

    let title = "";


    let texts = [];

    const {
      blocks,
    } = editor_content || {};

    blocks && blocks.map(n => {

      const {
        text,
      } = n;

      if (text) {
        texts.push(text);
      }

    });

    title = texts.join(" ").substr(0, 100);

    return super.setPageMeta({
      // title: `${name ? `${name} | ` : ''}Комментарий к топику ${longtitle || topicName}`,
      title,
      canonical: uri,
      ...meta,
    });

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