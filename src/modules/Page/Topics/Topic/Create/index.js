import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import TopicPage from '../';

import {
  createTopicProcessor,
} from 'src/modules/query';


export default class TopicCreatePage extends TopicPage {
 
  
  // static contextTypes = {
  //   router: PropTypes.object.isRequired,
  // };


  onSave(result){



    if(result){

      const {
        response,
      } = result.data || {}

      
      const {
        // id,
        url_name,
      } = response && response.data || {}; 

      if(url_name){

        const {
          history,
        } = this.props;

        // history.replace(`/topics/${id}/`);
        history.replace(`/topics/${url_name}/`);
      }
      
    }

  }


  componentWillMount(){

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(createTopicProcessor, {
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
      data: {
        object: {},
      },
    });

    super.componentWillMount && super.componentWillMount();

  }


  render() {

    const {
      View,
      ...other
    } = this.props;


    const {
      Renderer,
      data,
    } = this.state;


    return <Renderer
      data={data}
      onSave={result => this.onSave(result)}
      _dirty={{
        published: true,
      }}
      {...other}
    />

  }

}
