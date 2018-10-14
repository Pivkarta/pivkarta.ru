import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GraphqlConnector from 'src/modules/graphql-connector';

import { compose, graphql } from 'react-apollo';

import Grid from "material-ui/Grid";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import ClearIcon from 'material-ui-icons/Clear';
import LoadingIcon from 'material-ui-icons/HourglassEmpty';

import AddLink from "src/modules/ui/AddLink";

import {
  lettersConnection,
} from "src/modules/query";

import View from "./View";

import Page from "../layout";

export class LettersPage extends Page {


  static propTypes = {
    ...Page.propTypes,
    getFilters: PropTypes.func.isRequired,
    hasFilters: PropTypes.func.isRequired,
    onFilterFieldChange: PropTypes.func.isRequired,
    cleanFilters: PropTypes.func.isRequired,
  }

  render(content) {

    const {
      user: currentUser,
    } = this.context;

    if(!currentUser || currentUser.sudo !== true){
      return null;
    }
    

    const {
      getFilters,
      setFilters,
      hasFilters,
      cleanFilters,
      onFilterFieldChange,
      getPage,
      ...other
    } = this.props;

    if (content !== undefined) {
      return super.render(content);
    }

    const {
      email,
    } = getFilters();

    return super.render(
      <Grid
        container
      >
        <Grid
          item
          xs={12}
        >

          <Grid
            container
            spacing={8}
            alignItems="baseline"
          >

            <Grid
              item
            >
              <TextField
                name="email"
                label="Емейл"
                helperText="Фильтр по емейлу"
                onChange={onFilterFieldChange}
                value={email || ""}
              />
            </Grid> 


            {hasFilters()
              ?
              <Grid
                item
              >
                <Button
                  onClick={cleanFilters}
                >
                  Clear
                </Button>
              </Grid>
              :
              null
            }

            <Grid
              item
              xs
            >

            </Grid>

            <Grid
              item
            >
              <AddLink
                to="/letters/create"
              />
            </Grid>

          </Grid>

        </Grid>

        <Grid
          item
          xs={12}
        >
          <View
            {...other}
          />
        </Grid>

      </Grid>
    )
  }
}



export default class LettersPageProxy extends GraphqlConnector {

  static defaultProps = {
    ...GraphqlConnector.defaultProps,
    Connector: compose(graphql(
      lettersConnection,
    ))(LettersPage),
    first: 10,
    orderBy: "createdAt_DESC",
  };



  addFilterCondition(where, key, value) {

    switch(key){

      case "email": 
        key = "email_contains";
        break;

    }

    return super.addFilterCondition(where, key, value);
  }

}

