import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import PlacePage from '../';

import {
  createPlace,
} from 'src/modules/query';


export default class CompanyPlacePage extends PlacePage {
 
  
  // static contextTypes = {
  //   router: PropTypes.object.isRequired,
  // };


  onSave(result){



    if(result){

      const {
        response,
      } = result.data || {}


      const {
        data: object,
      } = response || {};

      
      const {
        id,
        place_id,
        url_name,
      } = object || {}; 

      if(place_id){

        const {
          history,
        } = this.props;

        history.push(`/place/${place_id}/${url_name}`);
      }
      
    }

  }


  componentWillMount(){

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(createPlace, {
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
      // data: {
      //   object: {
      //   },
      // },
    });

  }


  // componentDidMount(){

  //   this.updateObject({
  //   });

  //   super.componentDidMount && super.componentDidMount();
  // }


  render() {

    const {
      View,
      ...other
    } = this.props;


    const {
      Renderer,
      data,
    } = this.state;

    // return null;

    return super.render(<Renderer
      onSave={result => this.onSave(result)}
      _dirty={{
        name: "",
        active: true,
      }}
      {...other}
      data={{
        object: {
        },
      }}
    />);

  }

}
