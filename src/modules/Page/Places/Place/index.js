// import React from 'react'
// import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  place,
  updatePlaceData,
} from 'src/modules/query';

import View from './View';

import PlacesPage from '../';

let { ...defaultProps } = PlacesPage.defaultProps;

Object.assign(defaultProps, {
  View,
});

export default class PlacePage extends PlacesPage {


  static defaultProps = defaultProps;



  componentWillMount() {

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(place, {
      }),
      graphql(updatePlaceData, {
      }),

    )(View);

    Object.assign(this.state, {
      Renderer,
    });

    super.componentWillMount && super.componentWillMount();

  }


  setPageMeta(meta) {

    // const {
    //   setPageMeta,
    // } = this.context;

    // console.log("PlacePage setPageMeta", meta, setPageMeta);

    // return setPageMeta && setPageMeta(meta);

    return super.setPageMeta(meta || {});
  }


  // render(content){

  //   return super.render(content);
  // }

}

