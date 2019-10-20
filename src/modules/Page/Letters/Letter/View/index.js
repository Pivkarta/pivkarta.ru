import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';
// import TextField from 'material-ui/TextField';
// import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';

// import RemoveIcon from "material-ui-icons/Clear";

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import PlaceSelect from "src/modules/ui/Select/Place";

const styles = {
  root: {
  },
}

export class LetterView extends EditableView {


  canEdit() {

    const {
      editable,
    } = this.props;

    if (editable === false) {
      return false;
    }

    const {
      id,
    } = this.getObjectWithMutations();

    const {
      user: currentUser,
    } = this.context;

    return !id && currentUser && currentUser.sudo === true ? true : false;
  }


  // renderHeader(){

  //   const inEditMode = this.isInEditMode();

  //   if(inEditMode){
  //     return null;
  //   }
  //   else{
  //     return super.renderHeader();
  //   }

  // }



  getTextField(options) {

    return super.getTextField({
      disabled: !this.isInEditMode(),
      ...options,
    });
  }



  renderContent() {

    const inEditMode = this.isInEditMode();

    const object = this.getObjectWithMutations();

    const {
      ...other
    } = this.props;


    if (!object) {
      return null;
    }


    const {
      id,
      email,
      subject,
      message,
      status,
      Place,
    } = object;

    const {
      id: placeId,
    } = Place || {};

    return <Grid
      container
      spacing={8}
    >

      <Grid
        item
        xs={12}
        sm={3}
      >

        {this.getTextField({
          name: "email",
          label: "Емейл",
        })}

      </Grid>

      <Grid
        item
        xs={12}
        sm={3}
      >

        {this.getTextField({
          name: "subject",
          label: "Тема",
        })}

      </Grid>

      <Grid
        item
        xs={12}
        sm={3}
      >

        {this.getTextField({
          name: "status",
          label: "Статус",
          disabled: true,
        })}

      </Grid>


      <Grid
        item
        xs={12}
        sm={3}
      >

        {/* <PlaceSelect
          value={placeId || ""}
        /> */}

        {this.getTextField({
          Editor: PlaceSelect,
          // name: "placeId",
          value: placeId || "",
          inputProps: {
            // disable: id ? true : false,
            disabled: true,
          },
        })}

      </Grid>

      {message || inEditMode ? <Grid
        item
        xs={12}
      >

        <Grid
          container
          spacing={8}
        >

          {id
            ?
            <Grid
              item
              xs={12}
              md={6}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              />
            </Grid>
            :
            <Fragment>
              <Grid
                item
                xs={12}
                md={6}
              >
                {this.getTextField({
                  name: "message",
                  multiline: true,
                })}
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                />
              </Grid>
            </Fragment>

          }
        </Grid>

      </Grid>
        : null
      }

    </Grid>
  }
}

export default withStyles(styles)(LetterView);