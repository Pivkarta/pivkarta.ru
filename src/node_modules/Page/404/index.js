import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageLayout from '../layout';

export default class PageNotFound extends PageLayout {

  // static propTypes = {
  //   // prop: PropTypes
  // }


  componentWillMount(){

    if (!global.document) {
      global.document = {}
    }

    let {
      document,
    } = global;


    document.status = 404;


    return super.componentWillMount ? super.componentWillMount() : true;
  }

  setPageMeta(meta = {}){

    return {
      title: "Страница не найдена",
    }
  }


  render() {
    return super.render(
      <div>
        Page not found
      </div>
    )
  }
}
