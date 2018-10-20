// import React from 'react'
// import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  topic,
  updateTopicProcessor,
} from 'src/modules/query';

import View from './View';

import TopicsPage from '../';


export default class TopicPage extends TopicsPage {
  
  
  static defaultProps = {
    ...TopicsPage.defaultProps,
    View,
    updatePageTitle: true,
    isPage: true,
    showComments: true,
  };


  // constructor(props){

  //   super(props);

  //   this.state = {};

  // }


  componentWillMount(){

    const {
      View,
    } = this.props;

    const {
      Renderer,
    } = this.state;


    if(!Renderer){

      const Renderer = compose(
        graphql(topic, {
        }),
        graphql(updateTopicProcessor, {
        }),
      
      )(View);
  
      Object.assign(this.state, {
        Renderer,
      });
      
    }


    super.componentWillMount && super.componentWillMount();

  }
  


}

