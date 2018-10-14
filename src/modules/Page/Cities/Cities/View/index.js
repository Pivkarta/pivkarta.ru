import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CityLink from "src/modules/ui/Link/City";
import Grid from 'material-ui/Grid';

class CitiesPageView extends Component {

  static propTypes = {

  };

  render() {

    const {
      data: {
        objects,
      },
    } = this.props;

    return (
      <Grid
        container
        spacing={8}
      >
        {objects && objects.map(n => {

          const {
            id,
            name,
            lat,
            lng,
          } = n;

          return lat && lng ? <Grid
            key={id}
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
          >
            <CityLink
              object={n}
            >
              {name}
            </CityLink>
          </Grid> : null;

        })}
      </Grid>
    );
  }
}


export default CitiesPageView;