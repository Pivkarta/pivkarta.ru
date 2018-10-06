import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


import Avatar from '../../Avatar';

import {Link} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: "none",
  },
  row: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: "none",
  },
  // avatar: {
  //   margin: 10,
  // },
  // smallAvatar: {
  //   width: 30,
  //   height: 30,
  // },
  // bigAvatar: {
  //   width: 120,
  //   height: 120,
  // },
  // editable: {
  //   cursor: 'pointer',
  // },
};


export class UserLink extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    withAvatar: PropTypes.bool.isRequired,
    // fullname: PropTypes.bool.isRequired,
  }


  static defaultProps = {
    withAvatar: true,
    // fullname: true,
  };


  render() {

    const {
      user,
      withAvatar,
      classes,
      secondary,
      ...other
    } = this.props;
    
    
    if(!user){
      return null;
    }
    
    const {
      id,
      user_id,
      username,
      fullname,
      // lastname,
    } = user;

    const name = fullname || username;

    const url = `/profile/show/${user_id}/`;

    return (
      <Grid
        container
        className={classes.root}
      >

        <Grid
          item
        >
          {withAvatar && <Link
            key={id}
            to={url}
            href={url}
            {...other}
          >

            <Avatar
              user={user}
              size="small"
            />
            
          </Link> || null}

        </Grid>

        <Grid
          item
          xs
        >

          <Link
            key={id}
            to={url}
            href={url}
            {...other}
          >

            {name}
            
          </Link>

          {secondary}

        </Grid>

      </Grid>
    )
  }
}


export default withStyles(styles)(UserLink);