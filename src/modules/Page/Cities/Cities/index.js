
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  cities,
} from 'src/modules/query';

import View from './View';


import Page from 'src/modules/Page/layout.js';




export default class CitiesPage extends Page {


  static defaultProps = {
    ...Page.defaultProps,
    View,
    renderWithPagination: true,
  }


  componentWillMount() {

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(cities, {
        // name: 'items', 
        options: props => {

          return {
            variables: {
              orderBy: "name_ASC",
            },
          }
        },
      }),
      // graphql(updateTopicProcessor, {
      // }),

    )(View);

    Object.assign(this.state, {
      Renderer,
    });

    super.componentWillMount && super.componentWillMount();

  }


  setPageMeta(meta) {

    return super.setPageMeta(meta || {
      title: "Все города",
    });

  }

  // render(){

  //   return super.render(true);
  // }

}




