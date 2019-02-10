import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


import PlacesView from "../../../../../../Page/Places/View";
import { Typography } from 'material-ui';

import Grid from "material-ui/Grid";

// import Tarifs from '../../Tarifs';

export default class UserPlacesView extends Component {


  static propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  
  static contextTypes = {
    user: PropTypes.object.isRequired,
  }


  // renderTarifs() {

  //   // if(!this.canEdit()){
  //   //   return null;
  //   // }

  //   const {
  //     user,
  //   } = this.props;

  //   const {
  //     user: currentUser,
  //   } = this.context;

  //   if (!user || !currentUser || user.id !== currentUser.id) {
  //     return null;
  //   }

  //   return <Grid
  //     item
  //     xs={12}
  //   >
  //     <Tarifs
  //       user={user}
  //     />

  //   </Grid>

  // }



  render() {

    const {
      data,
      user,
      currentUser,
      ...other
    } = this.props;


    const {
      objectsConnection,
      loading,
    } = data;

    const {
      aggregate,
      edges,
    } = objectsConnection || {}

    let title;
    let output;

    if (!edges || !edges.length) {

      return null;

      // if (loading) {
      //   return null;
      // }
      // else {

      //   output = this.renderTarifs();

      // }
    }
    else {
      output = <Fragment>

        {/* {this.renderTarifs()} */}

        <Typography
          variant="title"
          style={{
            marginTop: 30,
            marginBottom: 10,
            color: "#2196F3",
          }}
        >
          {title}
        </Typography>

        <PlacesView
          data={{
            // objectsConnection: {
            //   aggregate,
            //   places: edges.map(({ node }) => (node)),
            // },
            objectsConnection,
          }}
        />
      </Fragment>
    }


    if (currentUser && currentUser.id === user.id) {
      title = "Ваши заведения"
    }
    else {
      title = "Заведения пользователя";
    }


    return (
      output
    )
  }
}
