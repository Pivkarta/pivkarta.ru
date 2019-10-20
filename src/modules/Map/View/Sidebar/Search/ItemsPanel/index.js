import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Tabs, { Tab } from 'material-ui/Tabs';
import List
  // , { ListItem, ListItemSecondaryAction, ListItemText } 
  from 'material-ui/List';

import PlaceImage from "src/modules/ui/Image/Place";

import Beers from './Beers';
import Item from './Item';

import withStyles from 'material-ui/styles/withStyles';

// import ArrowDown from 'material-ui-icons/ArrowDropDownCircle';
// import ArrowUp from 'material-ui-icons/ArrowDropUp';
import Arrow from 'material-ui-icons/ArrowDropDownCircle';

import geo from 'geolib';

const styles = {
  block: {
    marginTop: 10,
    padding: 3,

  },
  paper: {

    marginBottom: 5,
    transition: "height 0.3s ease-out",
    maxHeight: "100%",

    "&.collapsed": {
      marginBottom: 0,
      maxHeight: 0,
      overflow: "hidden",
    },
  },
  collapseBlock: {
    // background: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  arrow: {
    cursor: "pointer",
    fontSize: "2rem",
    color: "rgba(0,0,0,0.5)",
    marginRight: 8,
    transform: "rotate(90deg)",

    "&.collapsed": {
      transform: "rotate(-90deg)",
    },
  },
}

export class SearchBarItemsPanel extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    // places: PropTypes.array.isRequired,
    places: PropTypes.object,
    beersConnection: PropTypes.object,
    map: PropTypes.object.isRequired,
    maps: PropTypes.object.isRequired,
  }

  state = {
    tabIndex: "places",
    // tabIndex: "beers",
    collapsed: false,
  }


  handleTabsChange = (event, tabIndex) => {
    this.setState({
      tabIndex,
    });
  };


  render() {

    const {
      classes,
      places,
      beersConnection,
      style,
      lat,
      lng,
      map,
      maps,
      ...other
    } = this.props;


    const {
      tabIndex,
      collapsed,
    } = this.state;


    let tabContent;


    const {
      aggregate: placesAggregate,
      objects: palcesObjects,
    } = places || {};

    const {
      count: placesCount,
    } = placesAggregate || {}


    switch (tabIndex) {

      case "places":

        tabContent = palcesObjects && palcesObjects.length ?

          <List>
            {palcesObjects.map(n => {

              const {
                id,
                name,
                image,
                lat: objLat,
                lng: objLng,
                address,
                minPrice,
                maxPrice,
                uri,
              } = n;


              let distance;

              if (lat && lng && objLat && objLng) {
                distance = geo.getDistance({
                  lat,
                  lng,
                }, {
                    lat: objLat,
                    lng: objLng,
                  });
              }

              // return <ListItem
              //   key={id}
              // >

              //   {image ? <PlaceImage
              //     src={image}
              //     type="dot_thumb"
              //   /> : null}

              //   <ListItemText
              //     primary={name}
              //   />
              // </ListItem>;

              let primaryText = `${name}`;

              return <Item
                key={id}
                primaryText={primaryText}
                distance={distance}
                address={address}
                minPrice={minPrice}
                maxPrice={maxPrice}
                lat={objLat}
                lng={objLng}
                href={uri}
                map={map}
                maps={maps}
                // searchPanelDom={this.searchPanelDom}
                image={<PlaceImage
                  src={image}
                  type="dot_thumb"
                />}
                collapsePanel={event => {
                  this.setState({
                    collapsed: true,
                  });
                }}
              />;

            })}
          </List>
          : null
          ;

        break;

      case "beers":

        tabContent = <Beers
          beersConnection={beersConnection}
        />

        break;

    }


    const {
      aggregate: beersAggregate,
    } = beersConnection || {}


    const {
      count: beersCount,
    } = beersAggregate || {};


    if (!placesCount && !beersCount) {
      return null;
    }


    let arrows = <Arrow
      key="arrows"
      onClick={event => this.setState({
        collapsed: !collapsed,
      })}
      className={[classes.arrow, collapsed ? "collapsed" : ""].join(" ")}
    />


    return (
      <div
        className={[classes.block].join(" ")}
        // ref={(element, a,b) => {

        //   // this.refs.paper = props;
        //   // return props;
        //   this.searchPanelDom = element;
        // }}
      >
        <Paper
          style={style}
          className={[classes.paper, collapsed ? "collapsed" : ""].join(" ")}
        >

          <Grid
            container
            spacing={8}
            alignItems="center"
          >

            <Grid
              item
              xs
            >
              <Tabs
                value={tabIndex}
                onChange={this.handleTabsChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab
                  label={`Заведения ${placesCount ? `(${placesCount})` : ""}`}
                  value="places"
                />
                <Tab label={`Пиво ${beersCount ? `(${beersCount})` : ``}`}
                  value="beers"
                />
              </Tabs>
            </Grid>

            <Grid
              item
            >
              {arrows}
            </Grid>

          </Grid>


          {tabContent}

        </Paper>

        {collapsed ? arrows : null}

        {/* <div
          className={classes.collapseBlock}
          >
          <Arrow
            onClick={event => this.setState({
              collapsed: !collapsed,
            })}
            className={[classes.arrow, collapsed ? "collapsed" : ""].join(" ")}
          />
        </div> */}

      </div>
    )
  }
}

export default withStyles(styles)(SearchBarItemsPanel);