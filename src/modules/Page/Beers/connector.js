
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  beersConnection,
  updateBeer,
} from 'src/modules/query';

import View from './View';

import Grid from 'material-ui/Grid';

import Filters from './inc/Filters';


import URI from 'urijs';


export default class BeersPageConnector extends Component {


  static defaultProps = {
    View,
  }

  static contextTypes = {
    location: PropTypes.object.isRequired,
  }

  
  state = {}


  addObject(event) {

    const {
      history,
    } = this.props;

    history.push(`/places/create/`);

  }


  componentWillMount() {

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(beersConnection, {
        // name: 'items', 
        options: props => {

          return {
            fetchPolicy: "network-only",
          };
        },
      }),

    )(View);

    Object.assign(this.state, {
      Renderer,
    });

  }


  mutate = async ({ variables }) => {



    const {
      client,
    } = this.context;

    let {
      data,
      id,
    } = variables;

    let mutation;


    if (id) {

      mutation = updateBeer;

      variables = Object.assign({ ...variables }, {
        where: {
          id,
        },
      });

    }
    else {
      return false;
    }

    return await client.mutate({
      mutation,
      variables,
    })
      .then(r => {

        return r;
      })
      .catch(e => {
        // console.error(e);

        return e;
      });;

  }


  render() {

    const {
      View,
      first: limit,
      filters,
      where: propsWhere,
      ...other
    } = this.props;


    const {
      Renderer,
    } = this.state;

    const {
      location,
    } = this.context;


    const {
      pathname,
      search,
    } = location;



    // let {
    //   page,
    // } = search || {};

    const uri = new URI(pathname).query(search);

    let {
      page,
      container,
      color,
      name,
    } = uri.query(true);

    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;

    let where = {
      ...propsWhere,
    }

    if (color) {
      where.color = color;
    }

    if (container) {
      where.container = parseInt(container);
    }

    if (name) {
      where.name_contains = name;
    }

    return (<Grid
      container
      spacing={0}
    >
      <Grid
        item
        xs={12}
      >
        <Filters
          container={container ? parseInt(container) : undefined}
          color={color}
          name={name}
          filters={filters}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Renderer
          addObject={event => {
            this.addObject(event);
          }}
          page={page}
          skip={skip}
          first={limit}
          limit={limit}
          where={where}
          mutate={this.mutate}
          {...other}
        />
      </Grid>
    </Grid>)

  }
}




