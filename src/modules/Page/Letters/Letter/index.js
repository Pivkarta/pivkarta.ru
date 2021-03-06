import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../../layout';

import { compose, graphql } from 'react-apollo';

import {
  letter,
  updateLetterProcessor,
} from "src/modules/query";

import View from "./View";

export class LetterPage extends Page {

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  render(content) {

    const {
      user: currentUser,
    } = this.context;

    if(!currentUser || currentUser.sudo !== true){
      return null;
    }
    

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
  letter,
), graphql(
  updateLetterProcessor,
  )
)(LetterPage);