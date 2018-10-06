import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WalletIcon from 'material-ui-icons/AccountBalanceWallet';

import {Link} from 'react-router-dom';

export default class WalletView extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired,
  }

  state = {}

  // render() {

  //   const {
  //     etherwallet,
  //   } = this.props;

  //   return (
  //     <div>
  //       {etherwallet}
  //     </div>
  //   )
  // }



  componentDidMount(){

    this.loadBalance();

  }


  async loadBalance(){

    const {
      user,
      web3,
    } = this.props;
    


    // console.log('loadBalance', user, web3);

    if(!user || !web3){
      return;
    }

    const {
      etherwallet,
    } = user;

    if(!etherwallet){
      return;
    }

    try{

      web3.eth.getBalance(etherwallet)
      .then(balance => {

        this.setState({
          balance,
        });

      })
      .catch(e => {
        console.error(e);
      })


      

    }
    catch(e){
      console.error(e);
    }
  }


  render() {

    const {
      balance,
    } = this.state;

    if(balance === undefined){
      return null
    }

    return (
      <Link
        to="/wallet"
        href="/wallet"
        style={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <WalletIcon /> {balance / Math.pow(10,18)} Eth
      </Link>
    )
  }
}
