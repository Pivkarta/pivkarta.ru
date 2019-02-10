import PlaceView from "src/modules/ui/Place/ObjectView";

// export default PlaceView;

import PropTypes from "prop-types";

import chalk from "chalk";

export default class PlacePageView extends PlaceView {


  static contextTypes = {
    ...PlaceView.contextTypes,
    setGeoCoords: PropTypes.func.isRequired,
  }


  componentWillMount() {

    this.setCoords();

    super.componentWillMount && super.componentWillMount();
  }


  setCoords() {

    if (typeof window === "undefined") {

      const {
        setGeoCoords,
      } = this.context;

      const {
        data: {
          object,
        },
      } = this.props


      const {
        lat,
        lng,
      } = object || {}




      if (lat && lng) {
        setGeoCoords({
          lat,
          lng,
        }, true);

      }
    }


  }


  // render() {


  //   // this.setCoords();

  //   // const {
  //   //   data,
  //   // } = this.props



  //   return super.render();
  // }

}