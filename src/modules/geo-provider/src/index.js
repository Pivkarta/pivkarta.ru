import React, { Component } from 'react'
import PropTypes from 'prop-types'

import chalk from "chalk";


export default class GeoProvider extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    uri: PropTypes.object.isRequired,
  }


  static childContextTypes = {
    setGeoCoords: PropTypes.func,
    getGeoCoords: PropTypes.func,
  };


  state = {
    currentCoords: null,
  }


  getChildContext() {

    const {
    } = this.state;

    return {
      setGeoCoords: (coords, updateURL) => this.setGeoCoords(coords, updateURL),
      getGeoCoords: () => this.getGeoCoords(),
    }

  }


  componentWillMount() {


    this.initCoords();


    super.componentWillMount && super.componentWillMount();
  }


  componentDidUpdate(prevProps, prevState, prevContext) {



    const {
      lat,
      lng,
    } = this.getCoordsFromUrl() || {};


    const {
      lat: currentLat,
      lng: currentLng,
    } = this.state.currentCoords || {};

    if (lat && lng) {

      if (
        ((lat) && lat !== currentLat)
        || ((lng) && lng !== currentLng)
      ) {

        let currentCoords = {
          lat,
          lng,
        };

        this.setState({
          currentCoords,
        });

      }

    }

  }

  initCoords() {

    let currentCoords = this.getCoordsFromUrl()





    // if (typeof window === "undefined") {


    // }
      
      
    
    /**
     * Если не определены координаты, получаем их по geoip
     */
    if (!currentCoords) {
      
      currentCoords = global.coords || currentCoords;
      
      // let geo = global.geo;

      // let {
      //   0: lat,
      //   1: lng,
      // } = geo && geo.ll || []

      // if (lat && lng) {

      //   currentCoords = {
      //     lat,
      //     lng,
      //   }

      // }

    }




    this.state.currentCoords = currentCoords;

  }

  getCoordsFromUrl() {

    const {
      uri,
    } = this.context;

    let coords;



    global.uri = uri;

    let coordsPath = this.getCoordsPath(uri);

    if (coordsPath) {

      const {
        0: lat,
        1: lng,
      } = coordsPath.replace("@", "").split(",");

      coords = {
        lat,
        lng,
      }

    }



    return coords;
  }


  /**
   * Устанавливаем координаты.
   * В базовом варианте просто обновляем текущий стейт, чтобы
   * дочерние объекты могли получить информацию
   */
  setGeoCoords(coords = {}, updateURL = false) {


    const {
      uri,
      router,
    } = this.context;

    const {
      lat,
      lng,
    } = coords;



    if (!lat || !lng) {
      return null;
    }


    let {
      currentCoords,
    } = this.state;


    const {
      lat: currentLat,
      lng: currentLng,
    } = currentCoords || {}


    /**
     * Првоеряем наличие гео-информации в УРЛ.
     * Если нету, то дописываем
     */

    if (!this.getCoordsPath(uri)) {

      // window.uri = uri


      /**
       * Обновляем УРЛ
       */

      // Проверяем есть ли в УРЛ раздел с координатами


      if (updateURL) {

        // let newUri = uri.clone();

        // // newUri.

        // let coordsString = `@${lat},${lng},11/`;

        // newUri.segment(coordsString);
        // newUri.segment("");



        // router.history.replace(newUri.toString());

        // if(!global.document){

        //   global.document = {

        //   }

        //   Object.assign(global.document, {
        //     coords,
        //   })

        // }

      }

    }


    if (currentLat !== lat || currentLng !== lng) {

      // this.state.currentCoords = {
      //   lat,
      //   lng,
      // };

      currentCoords = {
        lat,
        lng,
      }

      this.setState({
        currentCoords,
      });


      // this.state.currentCoords = currentCoords;

      /**
       * Если действие происходит на стороне сервера, то выставляем координаты глобально
       */




      if (typeof window === "undefined") {
        
        Object.assign(global, {
          coords: currentCoords,
        })

      }

    }


  }


  getGeoCoords() {

    let {
      currentCoords,
    } = this.state;

    currentCoords = currentCoords || {
      lat: 55.752,
      lng: 37.621,
    };




    return currentCoords;
  }


  getCoordsPath(uri) {
    return uri.segment().find(n => n && /^\@[0-9\.]+,[0-9\.]+,[0-9]+$/.test(n))
  }


  render() {


    const {
      children: {
        type: Type,
        props,
      },
    } = this.props;

    return <Type
      {...props}
    />

  }
}

