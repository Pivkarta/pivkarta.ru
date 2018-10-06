
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

import URI from 'urijs';

import CustomComponent from "Component";

export default class GraphqlConnector extends CustomComponent {


  static propTypes = {
    ...CustomComponent.propTypes,
    Connector: PropTypes.func.isRequired,
    first: PropTypes.number,
  }

  static defaultProps = {
    ...CustomComponent.defaultProps,
    // Connector: compose(graphql(
    //   coinsConnection,
    // ))(CoinsPage),
    // first: 10,
  };


  // static contextTypes = {
  //   ...CustomComponent.contextTypes,
  //   router: PropTypes.object.isRequired,
  // }


  // getFilters() {
  //   return {};
  // }


  getVariables() {


    const {
      first,
      skip,
      page,
    } = this.getPagingInfo();


    //   first,
    //   skip,
    //   page,
    // }, this.filters);


    let where = {};

    const filters = this.getFilters();

    if (filters) {
      Object.keys(filters).map(key => {
        const value = filters[key];
        this.addFilterCondition(where, key, value);
      });
    }


    return {
      first,
      skip,
      page,
      where,
    };
  }


  getPagingInfo() {
    const {
      first,
    } = this.props;

    const page = this.getPage();

    let skip = page && first > 0 ? (page - 1) * first : undefined

    return {
      first,
      skip,
      page,
    }
  }

  getPage() {

    const {
      router: {
        history: {
          location: {
            pathname,
            search,
          },
        },
      },
    } = this.context;

    const uri = new URI(`${pathname}${search}`);
    const urlParams = uri.query(true);

    let {
      page,
    } = urlParams;

    page = page ? parseInt(page) : undefined;

    return page;
  }

  setPage() {

  }


  render() {

    const {
      Connector,
      ...other
    } = this.props;

    if (!Connector) {
      return null;
    }


    const variables = this.getVariables();

    return <Connector
      // first={first}
      // skip={skip}
      // page={page}
      {...variables}
      hasFilters={() => this.hasFilters()}
      getFilters={() => this.getFilters()}
      getPage={() => this.getPage()}
      setPage={(page) => this.setPage(page)}
      cleanFilters={() => this.cleanFilters()}
      setFilters={(filters) => this.setFilters(filters)}
      onFilterFieldChange={event => this.onFilterFieldChange(event)}
      // hasFilters={() => {
      //   return false;
      // }}
      {...other}
    />
  }
}
