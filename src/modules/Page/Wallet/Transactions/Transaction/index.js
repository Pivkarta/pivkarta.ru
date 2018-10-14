import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../../../layout';
import Grid  from 'material-ui/Grid';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import DoneIcon from 'material-ui-icons/Done';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import NoReceiptIcon from 'material-ui-icons/HourglassEmpty';
import RefreshIcon from 'material-ui-icons/Autorenew';
import LoadingIcon from 'material-ui-icons/Restore';

const contextTypes = Object.assign({...Page.contextTypes}, {
  web3: PropTypes.object.isRequired,
});

export default class TransactionPage extends Page {

  static contextTypes = contextTypes;

  static propTypes = {
    transactionHash: PropTypes.string.isRequired,
  }


  state = {}


  componentDidMount(){

    this.loadTransactionData();
  }


  async loadTransactionData(){

    const {
      transactionHash,
    } = this.props;

    const {
      web3,
    } = this.context;

    if(!transactionHash || !web3){
      return null;
    }

    this.setState({
      loading: true,
    });

    const transaction = await web3.eth.getTransaction(transactionHash)
    .then(transaction => {
      // this.setState({
      //   transaction,
      // });
      return transaction;
    })
    .catch(e => console.error);
    
    const transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash)
    .then(transactionReceipt => {

      return transactionReceipt;
    })
    .catch(e => console.error);
    
    this.setState({
      transaction,
      transactionReceipt,
      loading: false,
    });
  }
  container

  render() {

    const {
      transaction,
      transactionReceipt,
      loading,
    } = this.state;

    if(!transaction){

      return null;
    }

    const {
      hash,
      from,
      to,
      value,
    } = transaction;

    const {
      contractAddress,
      status,
    } = transactionReceipt || {}

    return super.render(<Grid
      container
    >
      <Grid
        item
        xs={12}
      >

        <Typography
          type="subheading"
        >
          {hash}
        </Typography>

        <Table>

          <TableBody>

            <TableRow>

              <TableCell>
                Статус: 
              </TableCell>

              <TableCell>

                <Grid
                  container
                  alignItems="center"
                >

                  {transactionReceipt
                    ?
                      status === "0x1" 
                      ?
                      <DoneAllIcon 
                        style={{
                          color: "green",
                        }}
                      />
                      :
                      <DoneIcon />
                    :
                    <NoReceiptIcon />
                  }

                  {status !== "0x1"
                    ?
                    <IconButton
                      onClick={event => this.loadTransactionData()}
                    >
                      {loading ? <LoadingIcon /> : <RefreshIcon />}
                    </IconButton>
                    :
                    null
                  }

                </Grid>

              </TableCell>

            </TableRow>

            <TableRow>

              <TableCell>
                Отправитель: 
              </TableCell>

              <TableCell>

                {from}

              </TableCell>


            </TableRow>

            <TableRow>

              <TableCell>
                Получатель: 
              </TableCell>

              <TableCell>

                {to}

              </TableCell>
              
            </TableRow>

            <TableRow>

              <TableCell>
                Сумма: 
              </TableCell>

              <TableCell>

                {value / Math.pow(10, 18) || 0} Eth

              </TableCell>

            </TableRow>

          </TableBody>

        </Table>


      </Grid>

    </Grid>);
  }
}
