import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopicView from "src/modules/ui/Topic/ListView";

import Grid from "material-ui/Grid";

export default class TopicsView extends Component {

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
        spacing={8}
      >
        {items.map(n => {

          const {
            id,
          } = n;

          return <Grid
            key={id}
            item
            xs={12}
          >
            <TopicView
              data={{
                object: n,
              }}
            />
          </Grid>
        })}
      </Grid>
    );
  }
}
