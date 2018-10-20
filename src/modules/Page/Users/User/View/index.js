import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// import IconButton from 'material-ui/IconButton';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';


import UserAvatar from './Avatar';
 

import Places from './Places';

let propTypes = { ...EditableView.propTypes }
let contextTypes = { ...EditableView.contextTypes }


Object.assign(propTypes, {
  // user: PropTypes.object.isRequired,
});

Object.assign(contextTypes, {
  loadApiData: PropTypes.func.isRequired,
  setPageMeta: PropTypes.func.isRequired,
});




export default class UserPageView extends EditableView {

  static propTypes = propTypes;

  static contextTypes = contextTypes;


  setPageMeta() {

    const {
      setPageMeta,
    } = this.context;

    setPageMeta({
      title: this.getTitle(),
    });

  }

  componentWillMount() {

    this.setPageMeta();
  }


  componentDidUpdate() {

    this.setPageMeta();

    super.componentDidUpdate && super.componentDidUpdate();
  }


  getTitle() {

    const draftObject = this.getObjectWithMutations();

    const {
      username,
      fullname,
    } = draftObject || {};

    return fullname || username;
  }



  renderAvatar() {

    const draftObject = this.getObjectWithMutations();

    return <UserAvatar
      user={draftObject}
      updateUser={this.onUpdateAvatar}
      editable={this.canEdit()}
    />
  }


  canEdit() {

    const {
      user: currentUser,
    } = this.context;

    const {
      data,
    } = this.props;

    const {
      object: user,
    } = data || {};

    return currentUser && user && currentUser.id === user.id ? true : false;
  }


  async save() {


    const result = await super.save()
      .then(r => {



        const {
          loadApiData,
        } = this.context;

        loadApiData();

        return r;
      })
      .catch(e => {
        console.error(e);
      });

    return result;

  }


  onUpdateAvatar = (file) => {



    if (file) {

      const {
        id,
        path,
        mimetype,
      } = file;

      if (!path) {

        this.addError("File URL is empty");

        return;
      }

      if (!mimetype) {

        this.addError("Wrong file type");

      }
      else if (!mimetype.match(/image/)) {

        this.addError("Only images allow");

      }
      else {

        let image = path;

        this.updateObject({
          image,
        });

      }

    }
    else {

      this.addError("File did not received");

    }


  }


  // renderTarifs() {

  //   // if(!this.canEdit()){
  //   //   return null;
  //   // }

  //   const {
  //     data: {
  //       object: user,
  //     },
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


  renderDefaultView() {

    const user = this.getObjectWithMutations();

    const {
      id,
      firstname,
      middlename,
      lastname,
      callPrice,
      chatPrice,
      etherwallet,
    } = user;


    const {
      user: currentUser,
    } = this.context;

    const {
      etherwallet: curruserEtherwallet,
    } = currentUser || {}

    return <Grid
      container
    >

      <Grid
        item
        xs={12}
      >

        {this.renderAvatar()}

      </Grid>

  

      <Grid
        item
        xs={12}
      >
        <Places
          user={user}
          currentUser={currentUser}
        />
      </Grid>

    </Grid>;

  }

  renderEditableView() {

    return <form
      onSubmit={event => {

        event.preventDefault();
        this.save();
      }}
    >
      <button type="submit" hidden/>
      <Grid
        container
      >

        <Grid
          item
          xs={12}
        >

          {this.renderAvatar()}

        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
        >



          <Grid
            container
            spacing={8}
          >

            <Grid
              item
              xs={12}
            >
              {this.getTextField({
                name: "fullname",
                label: "ФИО",
                helperText: "Укажите полное имя",
              })}

            </Grid>

            <Grid
              item
              xs={12}
            >

              {this.getTextField({
                name: "password",
                label: "Пароль",
                type: "password",
                helperText: "Укажите, если хотите сменить пароль",
                autoComplete: "off",
              })}
            </Grid>

          </Grid>


        </Grid>

      </Grid>
    </form>;

  }


}

// export default withStyles(styles)(UserPageView);
