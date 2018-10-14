import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentView from "src/modules/ui/Comment/View";

import Grid from "material-ui/Grid";

export default class CommentsView extends Component {

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
            sm={6}
            lg={3}
          >
            <CommentView
              data={{
                object: n,
              }}
              showLink={true}
            />
          </Grid>
        })}
      </Grid>
    );
  }
}
