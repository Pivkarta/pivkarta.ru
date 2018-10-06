import React, { Component } from 'react';

import ObjectView from "../ObjectView";

export default class TopicListView extends ObjectView {


  static defaultProps = {
    ...ObjectView.defaultProps,
    cutText: true,
  }

  // renderHeader(){

  //   return null;
  // }


  // render(){

  //   return "TopicListView";
  // }

} 