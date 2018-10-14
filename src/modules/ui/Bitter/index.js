import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Bitter extends Component {

  static propTypes = {
    bitter: PropTypes.number.isRequired,
  }

  render() {

    const {
      bitter,
    } = this.props;

    if(!bitter){
      return null;
    }

    let bitterStr = '';

    if(bitter >= 40){
      bitterStr = "Горькое";
    }
    else if(bitter >= 20){
      bitterStr = "Средняя горечь";
    }
    else if(bitter >= 10){
      bitterStr = "Легкая горечь";
    }
    else{
      bitterStr = "Еле заметная горечь";
    }


    return (
      `${bitterStr} (${bitter}/100 IBU)`
    )
  }
}
