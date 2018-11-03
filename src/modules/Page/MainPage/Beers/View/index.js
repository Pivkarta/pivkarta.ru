import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BeerView from "modules/ui/Beer/List/View";

import Grid from "material-ui/Grid";


export default class BeersView extends Component {

  render() {

    const {
      data: {
        loading,
        objectsConnection,
      },
    } = this.props;

    // return null;

    const items = objectsConnection && objectsConnection.edges.map(n => n.node) || [];

    return (
      <Grid
        container
        spacing={16}
      >
        {items.map(n => {

          const {
            id,
          } = n;

          return <Grid
            key={id}
            item
            xs={12}
            sm={4}
            md={2}
          >

            <BeerView
              beer={n}
            />

          </Grid>
        })}
      </Grid>
    );
  }
}
