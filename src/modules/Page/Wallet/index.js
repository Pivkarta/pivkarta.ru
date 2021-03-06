import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';

// import UserView from './View';

// import {
//   user,
// } from 'src/modules/query';

import Page from '../layout';

import Grid  from 'material-ui/Grid';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import {Link} from 'react-router-dom';

import WalletView from './View';

const contextTypes = Object.assign({...Page.contextTypes}, {
  web3: PropTypes.object,
})

export default class WalletPage extends Page {

  
  // static propTypes = {
  // }


  static contextTypes = contextTypes
 

  render() {

    const {
      web3,
      user,
    } = this.context;


    if(!web3 || !user){
      return null;
    }

    const {
      username,
      etherwallet,
    } = user;


    if(!etherwallet){
      return <div>
        
        <Typography
          type="subheading"
          style={{
            color: "red",
          }}
        >
          Адрес кошелька не указан
        </Typography>

        <p>
          Перейдите в <Link
            to={`/profile/${username}`}
            href={`/profile/${username}`}
          >профиль</Link> и укажите адрес своего кошелька Ethereum.
        </p>

      </div>
    }

    const value = 1;

    return <div>

      {etherwallet ? <WalletView
        key={etherwallet}
        etherwallet={etherwallet}
      /> : null}

    </div>;
  }
}



