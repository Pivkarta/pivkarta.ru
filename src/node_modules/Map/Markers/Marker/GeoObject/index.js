import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles/';

import ExpandedCompany from '../Expanded/Company';

// import {
//   Marker,
// } from "react-google-maps";


const styles = {
  root: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width: 40,
    // border: "1px solid #000",
  },
  icon: {
    width: "100%",
  },
  label: {
    // position: "absolute",
    // width: "100%",
    // bottom: 0,
    // border: "1px solid",
    // textAlign: "center",

    width: "100%",
    top: 0,
    position: "absolute",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
    // border: "1px solid #000",
  },
  expandedRoot: {
    // position: "absolute",
    // bottom: "100%",
    // border: "1px solid blue",

    bottom: "100%",
    // border: "1px solid blue",
    position: "absolute",
    // height: "100px",
    left: "50%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
  },
  expanded: {
    position: "absolute",
    bottom: 0,
    // border: "1px solid green",
  },
}

export class MapMarker extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


  state = {};

  // constructor(props){




  //   super(props);

  // }

  // shouldComponentUpdate(){
  //   return false;
  // }


  // componentDidUpdate(){

  // }

  // componentWillReceiveProps(){

  // }

  render() {

    let {
      lat,
      lng,
      position,
      item,
      onClick,
      $dimensionKey,
      $getDimensions,
      $geoService,
      $hover,
      $onMouseAllow,
      $prerender,
      icon,
      label,
      classes,
      expanded,
      ...other
    } = this.props;




    // const {
    //   expanded,
    // } = this.state;


    let onCompanyClick;
    let expandedContent;


    if (!position && lat && lng) {
      position = {
        lat,
        lng,
      };
    }


    if (item && item._type === "Company") {

      // onCompanyClick = () => {


      //   this.setState({
      //     expanded: !expanded,
      //   });

      // }

      if (expanded) {
        expandedContent = <div
          className={classes.expandedRoot}
        >
          <ExpandedCompany
            className={classes.expanded}
            item={item}
          // style={{
          //   position: "absolute",
          // }}
          />
        </div>
      }

    }


    return (
      <div
        className={classes.root}
        // position={position}
        onClick={event => {


          // if(uri){
          // 	const {
          // 		router: {
          // 			history,
          // 		},
          // 	} = this.context;

          // 	history.push(uri);
          // }

          // var bubbleOptionsCrelan = {
          //   content: '<h4><strong>CRELAN BANK</strong><h4><p>Dorp-west 120<br />9080 Lochristi</p><p>Tel. 09 355 31 91<br />Fax 09 355 64 12<br /><a href="mailto:lochristi@crelan.be">lochristi@crelan.be</a></p><a href="https://maps.google.be/maps?q=Dorp-west+120+-+9080+Lochristi&hl=nl&sll=51.09623,4.227975&sspn=1.457516,3.749084&hnear=Dorp-West+120,+9080+Lochristi,+Oost-Vlaanderen,+Vlaams+Gewest&t=m&z=16" target="_blank">Routebeschrijving</a>'
          // }
          // var bubble = new google.maps.InfoWindow(bubbleOptionsCrelan);
          // google.maps.event.addListener(markerCrelan, 'click', function() {
          //   bubble.open(map,markerCrelan);
          // });

          if (onCompanyClick) {
            onCompanyClick(event);
          }

          return onClick ? onClick(event) : false;

        }}
        {...other}
      // title="fdgdfg"
      // shape={<div>
      //   sdf
      // </div>}
      // ref={item => {

      // }}
      >
        <img
          src={icon}
          className={classes.icon}
        />
        {label ? <label
          className={classes.label}
        >
          {label}
        </label> : null}
        {expandedContent}
      </div>
    )
  }
}

export default withStyles(styles)(MapMarker);