import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  beer,
  updateBeer,
} from 'src/modules/query';

import View from './View';

// import BeersPage from '../';
import BeersPage from '../../layout';

let {...defaultProps} = BeersPage.defaultProps;

Object.assign(defaultProps, {
  View,
});

export default class BeerPage extends BeersPage {


  static defaultProps = defaultProps;


  setPageMeta(meta) {
    // ToDo: добавить город

    // console.log("setPageMeta BeerPage", meta);

    // if(meta === undefined){

    //   let title = "Все сорта пива";
  
    //   meta = {
    //     title,
    //   }
      
    // }

    return super.setPageMeta(meta || {});
  }


  componentWillMount(){

    const {
      View,
      beer_id,
    } = this.props;


    const Renderer = compose(
      graphql(beer, {
      }),
      graphql(updateBeer, {
        options: {
          variables: {
            where: {
              beer_id,
            },
          },
        },
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
    });


    super.componentWillMount && super.componentWillMount();

  }


  render(content) {

    if(content !== undefined){
      return super.render(content);
    }

    const {
      ...other
    } = this.props;

    const {
      Renderer,
    } = this.state;

    return super.render(<Renderer
      {...other}
    />)

  }

}

