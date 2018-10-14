import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid  from 'material-ui/Grid';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import {Link} from 'react-router-dom';

export default class WalletView extends Component {

  static propTypes = {
    etherwallet: PropTypes.string.isRequired,
  }


  static contextTypes = {
    user: PropTypes.object,
    web3: PropTypes.object,
  };

  
  state = {}


  componentDidMount(){

    this.loadBalance();

  }


  async loadBalance(){

    const {
      user,
      web3,
    } = this.context;




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

      const balance = await web3.eth.getBalance(etherwallet)
      .then(balance => {
        return balance;
      })
      .catch(e => {
        console.error(e);
      })
      
      const transactionsCount = await web3.eth.getTransactionCount(etherwallet)
      .then(transactionsCount => {
        return transactionsCount;
      })
      .catch(e => {
        console.error(e);
      })

      this.setState({
        balance,
        transactionsCount,
      });

    }
    catch(e){
      console.error(e);
    }

  }


  render() {

    const {
      etherwallet,
    } = this.props;
    
    
    const {
      balance,
      transactionsCount,
    } = this.state;

    return (
      <div>

      <Table>

        <TableBody>

          <TableRow>

            <TableCell>
              Адрес кошелька:
            </TableCell>

            <TableCell>

              {etherwallet}

            </TableCell>

          </TableRow>
 
          <TableRow>

            <TableCell>
              Баланс:
            </TableCell>

            <TableCell>

              {(balance && balance / Math.pow(10, 18)) || 0} Eth

            </TableCell>

          </TableRow>

          <TableRow>

            <TableCell>
              Количество транзакций:
            </TableCell>

            <TableCell>
 
              {transactionsCount || 0}

            </TableCell>


          </TableRow>

        </TableBody>

      </Table>

    </div>
    )
  }
}
