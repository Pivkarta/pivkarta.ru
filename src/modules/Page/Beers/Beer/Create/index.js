import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import BeerPage from '../';

import {
  createBeer,
} from 'src/modules/query';


export default class CompanyBeerPage extends BeerPage {
 
  
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
        beer_id,
        url_name,
      } = object || {}; 

      if(beer_id){

        const {
          history,
        } = this.props;

        history.push(`/beer/${beer_id}/${url_name}`);
      }
      
    }

  }


  componentWillMount(){

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(createBeer, {
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
      data: {
        object: {},
      },
    });

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


    return super.render(<Renderer
      data={data}
      onSave={result => this.onSave(result)}
      _dirty={{}}
      {...other}
    />)

  }

}
