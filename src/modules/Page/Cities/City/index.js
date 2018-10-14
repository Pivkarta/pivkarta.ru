
/**
 * Страница города.
 * Выводим заведения в городе.
 * Для этого сначала получаем город. 
 * Если город не был получен, то выводим 404
 * Если был получен, запрашиваем страницу заведений с указанием координат
 */

import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  city,
} from 'src/modules/query';

import View from './View';

// import Page from '../../layout';
import PlacesPage from "../../Places/";
import PageNotFountPage from "../../404/";
 

// class CityPage extends Page {
class CityPage extends PlacesPage {


  static defaultProps = {
    ...PlacesPage.defaultProps,
    View,
  };



  // componentWillMount(){

  //   const {
  //     View,
  //   } = this.props;


  //   const Renderer = compose(
  //     graphql(city, {
  //     }),
  //     graphql(updatecityData, {
  //     }),
    
  //   )(View);

  //   Object.assign(this.state, {
  //     Renderer,
  //   });

  // }

  
  // setPageMeta(meta){

  //   return super.setPageMeta(meta);
  // }


  // render(){

  //   const {
  //     data: {
  //       loading,
  //       object: city,
  //     },
  //   } = this.props;

  //   let content = null

  //   if(!city){

  //     if(loading){
  //       return null;
  //     }

  //     else{
  //       content = 404;
  //     }

  //   }
  //   else{
  //     content = "city"
  //   }

  //   return content;

  // }
  


  setPageMeta(meta) {


    
    
    const city = this.getObject();



    if(!city){
      return;
    }


    if (meta === undefined) {
 
      const {
        name,
        alias,
      } = city;


      let title = name;

      meta = {
        title,
        canonical: alias,
      };

    }





    return super.setPageMeta(meta);

  }


  // getCoords() {

  //   const {
  //     lat,
  //     lng,
  //   } = this.getObject();

  //   return {
  //     lat,
  //     lng,
  //   };

  // }


  getObject(){

    const {
      city: {
        object,
      },
    } = this.props;

    return object;

  }


  render(){
    

    const {
      city: {
        loading,
        object: city,
      },
    } = this.props;

    let content = null

    if(!city){

      if(loading){
        return null;
      }

      else{
        // content = 404;
        return <PageNotFountPage />
      }

    }
    // else{
    //   content = "city"
    // }

    // return content;

    return super.render();

  }


}

export default graphql(city, {
  name: "city",
})(CityPage);