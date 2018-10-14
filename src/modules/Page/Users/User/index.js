import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import UserView from './View';

import {
  user,
  updateUser,
} from 'src/modules/query';

import Page from '../../layout';

export class UserPage extends Page {

  
  static propTypes = {
    ...Page.propTypes,
    match: PropTypes.object.isRequired,
  }


  // static contextTypes = {
  //   user: PropTypes.object,
  // }


  saveUser = async (data) => {

    const {
      updateUser,
    } = this.props;

    const {
      user: {
        user,
      },
    } = this.props;


    if(!user){
      return false;
    }

    const {
      id,
    } = user;

    const result = await updateUser({
      variables: {
        updateUserData: data,
        updateUserWhere: {
          id,
        },
      },
    })
    .then(r => r)
    .catch(e => {
      console.error(e);
    });



    return result;

  }


  render() {

    
    const {
      user: currentUser,
    } = this.context;


    const {
      ...other
    } = this.props;

    // if(!user){
    //   return null;
    // }

    return super.render(<UserView 
      // object={user}
      // data={data}
      // saveObject={this.saveUser}
      {...other}
    />)
  }
}




export default compose(
  graphql(user, {
    // name: 'user', 
  }),
  graphql(updateUser, {
    // name: 'updateUser', 
  }),

)(UserPage);

