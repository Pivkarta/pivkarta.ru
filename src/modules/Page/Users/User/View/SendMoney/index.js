import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button/Button';
import WalletIcon from 'material-ui-icons/AccountBalanceWallet';
import SendIcon from 'material-ui-icons/Send';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';


function financialMfil(numMfil) {
  return Number.parseFloat(numMfil / 1e3).toFixed(3);
}

export default class SendMoney extends Component {

  static contextTypes = {
    user: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    to: PropTypes.object.isRequired,
  }

  state = {
    open: false,
  }


  onChange = event => {

    let {
      name,
      value,
    } = event.target;


    switch(name){

      case 'amount':

        // value = parseFloat(value);

        if(parseFloat(value) === NaN){
          return false;
        }

        break;

    }


    this.setState({
      [name]: value,
    });

  }

  createTransaction = async event => {

    const {
      web3,
    } = this.context;


    let {
      amount,
    } = this.state;

    const transferAmount = parseFloat(amount);



    if(transferAmount === NaN || transferAmount <= 0){
      return false;
    }

    try{

      // var count = web3.eth.getTransactionCount("0x26..."); 

      // var abiArray = JSON.parse(fs.readFileSync('mycoin.json', 'utf-8')); 
      // var contractAddress = "0x8..."; 
      // var contract = web3.eth.contract(abiArray).at(contractAddress); 
      // var rawTransaction = { 
      //   "from": "0x26...", 
      //   "nonce": web3.toHex(count), 
      //   "gasPrice": "0x04e3b29200", "gasLimit": "0x7458", 
      //   "to": contractAddress, "value": "0x0", 
      //   "data": contract.transfer("0xCb...", 10, { from: "0x26..." }), "chainId": 0x03 }; 
      //   var privKey = new Buffer('fc3...', 'hex'); 
      //   var tx = new Tx(rawTransaction); tx.sign(privKey); 
      //   var serializedTx = tx.serialize(); 
      //   web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), 


      var Tx = require('ethereumjs-tx');


      // const myAddress = "0x4c791666351Ec3b223acF96C9d9BE431679E5C04";
      // var destAddress = "0xF7b9Bb273bf9C0Ed5ED47d7d2f383Fe2E08CDe07";

      const myAddress = this.getFromAddress();
      var destAddress = this.getToAddress();
      
      var contractAddress = destAddress;

      var count = await web3.eth.getTransactionCount(myAddress);
      
      var abiArray = [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
          "name": "",
          "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{
          "name": "_spender",
          "type": "address"
        }, {
          "name": "_value",
          "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
          "name": "",
          "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{
          "name": "_from",
          "type": "address"
        }, {
          "name": "_to",
          "type": "address"
        }, {
          "name": "_value",
          "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{
          "name": "",
          "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
          "name": "",
          "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{
          "name": "_spender",
          "type": "address"
        }, {
          "name": "_subtractedValue",
          "type": "uint256"
        }],
        "name": "decreaseApproval",
        "outputs": [{
          "name": "",
          "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [{
          "name": "_owner",
          "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
          "name": "balance",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
          "name": "",
          "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{
          "name": "_to",
          "type": "address"
        }, {
          "name": "_value",
          "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{
          "name": "",
          "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{
          "name": "_spender",
          "type": "address"
        }, {
          "name": "_addedValue",
          "type": "uint256"
        }],
        "name": "increaseApproval",
        "outputs": [{
          "name": "",
          "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }, {
        "constant": true,
        "inputs": [{
          "name": "_owner",
          "type": "address"
        }, {
          "name": "_spender",
          "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }, {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }, {
        "anonymous": false,
        "inputs": [{
          "indexed": true,
          "name": "owner",
          "type": "address"
        }, {
          "indexed": true,
          "name": "spender",
          "type": "address"
        }, {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
      }, {
        "anonymous": false,
        "inputs": [{
          "indexed": true,
          "name": "from",
          "type": "address"
        }, {
          "indexed": true,
          "name": "to",
          "type": "address"
        }, {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
      }]
      // var contract = new web3.eth.Contract(abiArray)
      var contract = new web3.eth.Contract(abiArray, destAddress, {
        from: myAddress
      });
      // .at(contractAddress);



      // How many tokens do I have before sending?
      // var balance = await contract.methods.balanceOf(myAddress).call();

      await web3.eth.call({
        to: destAddress,
        data: contract.methods.balanceOf(myAddress).encodeABI()
      }).then(balance => {


      })
      .catch(e => {
        console.error(e);
      });

      // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
      // Use Gwei for the unit of gas price
      var gasPriceGwei = 3;
      var gasLimit = 3000000;

      // const transferAmount = 0.0001;
      // const transferAmount = 0.0001 * Math.pow(10, 9);

      // Chain ID of Ropsten Test Net is 3, replace it to 1 for Main Net
      var chainId = 1;
      var rawTransaction = {
          "from": myAddress,
          "nonce": "0x" + count.toString(16),
          "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
          "gasLimit": web3.utils.toHex(gasLimit),
          "to": contractAddress,
          "value": web3.utils.toHex(transferAmount * Math.pow(10, 9) * 1e9),
          "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
          "chainId": chainId
      };

      
      var tx = new Tx(rawTransaction);
      

      

      // 0x8a7ad4f34bd430d7c4a3182b50964189776a28946e814c0b64f1b19d06a6cc80

      this.setState({
        transaction: tx,
        contract,
      });

      // try{

      //   tx.sign(privKey);
      //   var serializedTx = tx.serialize();
      //   // Comment out these four lines if you don't really want to send the TX right now



        
      //   // await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))

      //   // .on('receipt', async receipt => {

      //   //   // The receipt info of transaction, Uncomment for debug

      //   //   // // The balance may not be updated yet, but let's check
      //   //   // var balance = await contract.methods.balanceOf(myAddress).call();


      //   // });

      // }
      // catch(e){
      //   console.error(e);
      // }
 

    }
    catch(e){
      console.error(e);
    }

  }


  sendTransaction = async event => {
    
    const {
      web3,
    } = this.context;
    
    const {
      transaction: tx,
      contract,
      PK,
    } = this.state;

    const myAddress = this.getFromAddress();
    
    if(!tx || !PK || !web3){
      return null;
    }

    var privKey = new Buffer(PK, 'hex');


    try{

      tx.sign(privKey);
      var serializedTx = tx.serialize();



      // Comment out these four lines if you don't really want to send the TX right now

      
      const transaction = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      // .then(r => {



      // })
      // .catch(e => {
      //   console.error(e);
      // });

      transaction.on('confirmation', (confirmationNumber, receipt) => {

      });
  
      transaction.on('transactionHash', hash => {


        if(hash){

          const {
            router: {
              history,
            },
          } = this.context;

          history.push(`/wallet/tx/${hash}/`);

        }

      });
  
      transaction.on('receipt', receipt => {

        // res.json({ receipt });
      });

      transaction.on('error', console.error);
      
      await transaction.then(r => {

      })
      
      // var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      // // The receipt info of transaction, Uncomment for debug

      // // The balance may not be updated yet, but let's check
      // var balance = await contract.methods.balanceOf(myAddress).call();


    }
    catch(e){
      console.error(e);
    }

  }


  getFromAddress(){

    const {
      user,
    } = this.context;

    const {
      etherwallet,
    } = user;

    return etherwallet;

  }


  getToAddress(){

    const {
      to,
    } = this.props;

    const {
      etherwallet,
    } = to;

    return etherwallet;

  }
  

  render() {

    const {
      open,
      amount,
      transaction,
      PK,
    } = this.state;


    /*
      Сначала готовим транзакцию transaction
      После этого транзакцию надо подписать и отправить
    */
    

    const etherwallet = this.getToAddress();
    const from = this.getFromAddress();

    return (
      <div>

        {open
          ?
            <Grid
              container
            >

              <Grid
                item
                xs={12}
              >

                С кошелька: {from}

              </Grid>

              <Grid
                item
                xs={12}
              >

                На кошелек: {etherwallet}

              </Grid>

              <Grid
                item
                xs={12}
              >

                {transaction
                  ?
                  <Grid
                    container
                    spacing={0}
                    // alignItems="flex-end"
                  >

                    <Grid
                      item
                      xs
                    >

                      <TextField
                        label="Приватный ключ"
                        placeholder=""
                        // type="number"
                        name="PK"
                        value={PK || ""}
                        placeholder="Введите ключ для подтверждения транзакции."
                        helperText={`После подтверждения будет переведено ${amount} Эфира`}
                        fullWidth
                        onChange={this.onChange}
                      /> 

                    </Grid>

                    <Grid
                      item
                    >

                      <IconButton
                        onClick={this.sendTransaction}
                        disabled={!PK ? true : false}
                      >
                        <SendIcon />
                      </IconButton>

                    </Grid>

                  </Grid>
                  :
                  <Grid
                    container
                    spacing={0}
                    alignItems="flex-end"
                  >
                    <TextField
                      label="Amount"
                      placeholder="Eth"
                      // type="number"
                      name="amount"
                      value={amount || "0"}
                      onChange={this.onChange}
                    /> <IconButton
                      onClick={this.createTransaction}
                      disabled={(!amount || parseFloat(amount) === NaN || parseFloat(amount) <= 0) ? true : false}
                    >
                      <SendIcon />
                    </IconButton>
                  </Grid>
                }


              </Grid>

            </Grid>
          :
          <Button
            onClick={event => {
              this.setState({
                open: true,
              });
            }}
          >
            <WalletIcon /> Отправить Эфир
          </Button>
        }
      </div>
    )
  }
}
