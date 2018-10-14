import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';

// const styles = theme => {
//   // button: {
//   //   margin: theme.spacing.unit,
//   // },



// };


// function rand() {
//   return Math.floor(Math.random() * 20) - 10;
// }



// function Modals(props){
  
  
// }

export default class AppModal extends Component{

  getModalStyle() {
    // const top = 50 + rand();
    // const left = 50 + rand();
    const top = 50;
    const left = 50;
  
    return {
      position: 'absolute',
      width: 8 * 50,
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
      padding: 8 * 4,
    };
  }
  
  render(output){

    const { 
      children,
      ...other
    } = this.props;

    return <Modal
      {...other}
    >
      <div
        style={this.getModalStyle()}
      >
        {output || children}
      </div>
    </Modal>

  }

}

// export default withStyles(styles)(Modals);