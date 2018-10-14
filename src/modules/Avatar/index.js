import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar';

import { withStyles } from 'material-ui/styles';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    textDecoration: "none",
  },
  smallAvatar: {
    width: 40,
    height: 40,
  },
  bigAvatar: {
    width: 120,
    height: 120,
  },
  editable: {
    cursor: 'pointer',
  },
};


export class UserAvatar extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
  }


  static defaultProps = {
    size: "normal",
    // size: "big",
    editable: false,
  };


  render() {

    const {
      user,
      classes,
      size,
      editable,
      ...other
    } = this.props;


    if(!user){
      return null;
    }


    const {
      id,
      image,
      username,
      firstname,
      lastname,
    } = user;

    // const name = [firstname, lastname].filter(n => n).reduce((prev, next) => [prev, " ", next]) || username;
    const name = [firstname, lastname].filter(n => n).join(" ") || username;

    let classNames = [classes.avatar];

    let url;

    if(image){

      // url = `/images/avatar/${image}`;
      // url = `/images/resized/thumb/uploads/${image}`;
      url = `/images/resized/thumb/${image}`;

    }

    switch(size){

      case 'small': 

        classNames.push(classes.smallAvatar);
        break;


      case 'big': 

        classNames.push(classes.bigAvatar);

        break;

    }

    if(editable){
      classNames.push(classes.editable);
    }

    return (
      <Avatar
        alt={name}
        src={url || undefined}
        className={classNames.join(" ")}
        {...other}
      >
        {url ? "" : (name && name.substr(0, 1).toLocaleUpperCase() || "A")}
      </Avatar>
    )
  }
}

export default withStyles(styles)(UserAvatar);
