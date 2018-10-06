import React, { Component } from 'react'
import PropTypes from 'prop-types'


// Dotenv javascript libraries needed
// require('dotenv').config();

import View from './View';

export default class Wallet extends Component {

  // static propTypes = {
  //   etherwallet: PropTypes.string.isRequired,
  // }

  state = {}

  static contextTypes = {
    user: PropTypes.object,
    web3: PropTypes.object,
  };



  render() {

    const {
      user,
      web3,
    } = this.context;

    if(!user || !web3){
      return null
    }

    const {
      etherwallet,
    } = user;

    if(!etherwallet){
      return;
    }

    return <View
      key={etherwallet}
      user={user}
      web3={web3}
    />

    // return (
    //   <Link
    //     to="/wallet"
    //     href="/wallet"
    //     style={{
    //       display: "inline-flex",
    //       alignItems: "center",
    //     }}
    //   >
    //     <WalletIcon /> {balance / Math.pow(10,18)} Eth
    //   </Link>
    // )
  }
}
