import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles/';

import ExpandedCompany from './Expanded/Company';

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

    icon = icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gMcDB4FZwaw6gAAA4RJREFUWMPNmEtIVkEUx383nZKisIUtwiKKIoleUEESNF7dFBRCBBVlWCJRktIuWgQSUYsWZfag3FTQJrCVJsFw6UFBRAZh74IsRCokS3tctDbzweUy9/vu3HsDz+a735kz5/znzMx5jIMluZ6PkgLX86cAFcBaYL3+LgMcYAh4BdwD7gDPlRTfSUBOQnD7gWPADKCowLRxYBQ4q6Q4HNSTGcAAsBqgHVhEMvoMHFJSXIsL0rHw3j7gPNnQaSVFSxzBSYU8p38vZAgOoNn1/O6gjcQedD2/EbiY53w9AW4A3cAbzZsLVAE7gNVAScT8diVFU77tdgp4rwpQESIvABcYVFKM59ExDbgObIrQ06Ck6LDa4sCK2iLmtSkpKpQUA9pj+WhESbEZiDpzp1zPd6y32PX8XcAVw9A5JcUBm1ARiAJNEYvuUFI0xAboen4RMKADb5DeKSkW2IAzgLwObAsN/wLKlRRfC26xPjeLgZkGO1WANbjcHK17N/AjNFwCLI91BrXxVUBxaOgp8KlQWIgB9I9Of2GqNckXR+ipNvC6lRRjKcHlPi8BG0PDNTaBeqmB15NhoL5t4FXYACwz8N5mhU5JMRJXNgrgXyYIRQHsN/DmZWXU9XxT6vNtAD4w8GoydEx1TJuRALsMvE2u509KE2YCc01Z42YsgFrJS+B3aGgFMCtJkA7pLwZkiD0GKNPijYFaSfEReGdIiz1xargCBUg7UBoaHtZ9i1XBWm/gLXM9/0Qgbdnm4Xqg0SByUmeY2MVCTmFvRI48rqQ4UqgByi1C69oDmOq+b0qK0iTlFsBO4GqEyENggzbwN4+eyTq11UWItCopjiYCqFf+AZgTIeYDj4BrwC0lxXs9d7a+CHVAJTA9zwmYCvy0LvkDQBfqJvx/0FYlxY20Xd1r3RBlTc+AztRdnQY6DfiSpztLQkuUFH2p+uJQ9VGbYRHRoqToixOqbJ8+uvTNTUMfgPnAWNZPHzmQ/UB5QnC/dbocTltu5aMtKby3V0kxbJOFnCRWXM/fC1y2nHZGSdFs27I6CcDlPjujOjEDPQbWAOO21ZCT5rS7nn8XWBfjTXCekmI0iQ0nBThHl00vI5qs3KVYkmu4ktSSTsqQgev5M4FBwGR9pZKiN8lTSZpbHA49Q/oZLky704LLxIMBsJXAff33oJKibaK0rsGn4u2u57cmbQtM9A+ISmPmfHQaPAAAAABJRU5ErkJggg==';


    let onCompanyClick;
    let expandedContent;


    if (!position && lat && lng) {
      position = {
        lat,
        lng,
      };
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
      </div>
    )
  }
}

export default withStyles(styles)(MapMarker);