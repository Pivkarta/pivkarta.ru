import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';


import LocationIcon from 'material-ui-icons/LocationOn';

import withStyles from 'material-ui/styles/withStyles';

import { Link } from 'react-router-dom';

const styles = {
  icon: {
    color: "#2fa4e7",
    fontSize: "1rem",
  },
  primaryTextContainer: {
    paddingLeft: 5,
    fontSize: "1rem",
  },
  secondaryText: {
    fontSize: "0.8rem",
    color: "#666",
  },
  rub: {
    marginLeft: 2,
    marginRight: 2,
  },
  anchor: {
    display: "block",
    width: "100%",
  },
};


export class ItemsItem extends Component {

  static propTypes = {
    primaryText: PropTypes.any.isRequired,
    image: PropTypes.object,
    distance: PropTypes.number,
    map: PropTypes.object,
    maps: PropTypes.object,
    // searchPanelDom: PropTypes.object,
    collapsePanel: PropTypes.func,
  }

  render() {

    const {
      primaryText,
      secondaryText,
      region,
      container,
      container_str,
      image,
      distance,
      address,
      minPrice,
      maxPrice,
      classes,
      lat,
      lng,
      href,
      map,
      maps,
      // searchPanelDom,
      collapsePanel,
      ...other
    } = this.props;

    let distanceText;

    if (distance) {

      distanceText = distance > 1000 ? `${Math.round(distance / 1000)} км.` : `${distance} м.`;

    }

    // if (distanceText) {
    //   // primaryText += ` ~${distanceText}`;
    //   // distanceText = <LocationIcon />
    // }


    let prices;

    if (minPrice || maxPrice) {

      if (maxPrice === minPrice || !minPrice) {
        prices = maxPrice;
      }
      else {
        prices = `${minPrice}-${maxPrice}`;
      }

    }




    return <ListItem
      style={{
        paddingTop: 7,
        paddingBottom: 7,
      }}
      {...other}
    >

      <div
        ref={(element) => {
          this.domElement = element;
        }}
        style={{
          width: "100%",
        }}
      >
        <Link
          to={href}
          onClick={event => {

            if (lat && lng && map && maps) {

              event.preventDefault();

              const LatLng = new maps.LatLng({
                lat,
                lng,
              })

              map.setZoom(15);

              map.panTo(LatLng);

              /**
               * Если ширина видимой части шире не больше чем в два раза сайдбара,
               * то схлопываем панель поиска
               */
              if (this.domElement && collapsePanel) {



                const {
                  document: {
                    body,
                  },
                } = window;

                if(body.offsetWidth / 2 - 50 < this.domElement.offsetWidth){
                  collapsePanel();
                }

              }

            }

          }}
          className={classes.anchor}
        >
          <Grid
            container
            alignItems="center"
          >

            <Grid
              item
            >
              {image}
            </Grid>

            <Grid
              item
              xs
              className={classes.primaryTextContainer}
            >
              {primaryText}              

              <div
                className={classes.secondaryText}
              >
                {address ? address : ""}
                {region ? region : ""}
                {region ? " / " : ""}
                {container_str ? container_str : ""}
              </div>

            </Grid>

            <Grid
              item
              style={{
                fontSize: "0.9rem",
              }}
            >
              {distanceText ? <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  alignItems: "center",
                }}
              >
                <LocationIcon
                  className={classes.icon}
                /> {distanceText}
              </div> : null}

              {prices ? <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  className={[classes.icon, classes.rub].join(" ")}
                >₽</span> {prices}
              </div> : ""}

            </Grid>

          </Grid>
        </Link>
      </div>

      {/* {image} */}

      {/* <ListItemText
        primary={primaryText}
      /> */}
    </ListItem>;
  }
}

export default withStyles(styles)(ItemsItem);
