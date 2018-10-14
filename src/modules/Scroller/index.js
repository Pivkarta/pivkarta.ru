import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollerProvider extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }


  componentDidUpdate(prevProps, prevState) {

    //   prevProps.router, 
    //   prevProps.location, 
    //   this.props.location, 
    //   // prevProps.router.history.location, 
    //   // this.props.router.history.location, 
    //   prevProps.location === this.props.location
    // );


    const {
      location
    } = this.props;

    const {
      location: prevLocation,
    } = prevProps;


    if (prevLocation && location && prevLocation.pathname !== location.pathname) {

      setTimeout(() => {
        let element = global.document && global.document.querySelector("#content");

        element && element.scrollTo(0, 0)
      }, 100);
    }


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

export default class Scroller extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  // componentDidUpdate(prevProps, prevState){

  // }

  render() {

    // const {
    //   children: {
    //     type: Type,
    //     props,
    //   },
    // } = this.props;

    const {
      router,
    } = this.context;

    return <ScrollerProvider
      location={router.route.location}
      {...this.props}
    />

  }
}
