import React, {Component} from 'react';

import PropTypes from 'prop-types';

import GraphiQL from 'graphiql';

import Switch from 'material-ui/Switch';

// import { graphql, buildSchema } from 'graphql';

// 
// 

// import ORM from '../../ORM';

import {
  buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,

  introspectionQuery, 
  buildClientSchema, 
  printSchema,
} from 'graphql';

import defaultQuery from 'modules/Site/components/ORM/query';

import 'graphiql/graphiql.css';

import Page from '../';


let {
  ...contextTypes
} = Page.contextTypes;

Object.assign(contextTypes, {
  loadItems: PropTypes.func,
  apiRequest: PropTypes.func.isRequired,
  localQuery: PropTypes.func.isRequired,
  // orm: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  // db: PropTypes.object.isRequired,
});



export default class PageGraphiQL extends Page{

  static contextTypes = contextTypes; 

  constructor(props){

    super(props);

    this.state = {
      storage: 'local',
    }
  }

  
  apiRequest(path, params, options){

    let {
      apiRequest,
    } = this.context;

    return apiRequest(null, true, path, params, options);
  }


  _graphQLFetcher(graphQLParams, a,b,c){
    
    

    const {
      storage,
    } = this.state;

    const fetcher = storage == 'local' ? this.graphQLFetcherLocal : this.graphQLFetcher;

    return fetcher.call(this, graphQLParams, a,b,c);
  }

  graphQLFetcher(graphQLParams) {

    const {
      query,
      ...other
    } = graphQLParams;

    return fetch('/api/?pub_action=graphql', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...other}),
      // body: JSON.stringify(body),
      // body: body,
    }).then(response => response.json());
  }

  graphQLFetcherLocal(graphQLParams) {
    
    
 
    const {
      localQuery,
    } = this.context;

    return localQuery(graphQLParams); 
    
 
  }

 

  componentWillMount(){



  }


  success(msg, object){
    return {
      success: true,
      message: msg || "",
      object: object,
    };
  }

  failure(msg, object){
    return {
      success: false,
      message: msg || "",
      object: object,
    };
  }
 
  render(){

    if(typeof window === 'undefined'){

      return null;
    }
    
    const {
      storage,
      schema: remoteSchema,
    } = this.state;
 
    let schema;

    const {
      schema: localSchema,
    } = this.context;

    schema = localSchema;
 

    if(!schema){

      return null;
    }

    return <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div>
        <Switch
          checked={storage == 'local'}
          onChange={(event, checked) => this.setState({
            storage: storage == 'local' ? '' : 'local',
          })}
        /> <b>Локальное хранилище: </b> 
      </div>

      <GraphiQL
        schema={schema}
        defaultQuery={defaultQuery || ""}
        fetcher={::this._graphQLFetcher}
        // fetcher={::this.graphQLFetcherLocal}
      />  
    </div>;
  }
}

