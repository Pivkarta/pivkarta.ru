import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from "src/modules/Page/MainPage/Places/View";

import { Link } from "react-router-dom";
import Grid from 'material-ui/Grid';
import BeerMapLink from 'src/modules/ui/Link/Beer/Map';

class PlacesView extends View {

  static propTypes = {

  };

  render() {

    const {
      data: {
        objectsConnection,
      },
      item,
    } = this.props;

    if (!objectsConnection) {
      return null;
    }


    const {
      edges,
    } = objectsConnection;


    if (!edges.length) {
      return null;
    }


    const {
      beer_id,
      name,
    } = item;

    return (
      <div>
        <h3 className="h3main">


          <Grid
            container
            spacing={8}
          >

            <Grid
              item
              xs
            >

              <i className="fas fa-award"></i> ИМЕЕТСЯ В ЗАВЕДЕНИЯХ
            </Grid>

            <Grid
              item
            >

              <BeerMapLink
                item={item}
              />
            </Grid>

          </Grid>



        </h3>

        {super.render()}
      </div>
    );
  }
}

export default PlacesView;