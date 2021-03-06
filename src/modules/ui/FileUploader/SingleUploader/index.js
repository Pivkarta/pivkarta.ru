import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SingleUploaderInput from 'src/modules/react-cms-uploads/src/components/uploader/SingleUploader';

import IconButton from 'material-ui/IconButton';

import UploadIcon from 'material-ui-icons/CloudUpload';
import DeleteIcon from 'material-ui-icons/Clear';

import Image from '../../Image';
import Grid from 'material-ui/Grid';

class FileInput extends Component {


  static propTypes = {
    onDelete: PropTypes.func,
  }

  render() {

    const {
      editable,
      value,
      onDelete,
      ...other
    } = this.props;

    return <div>

      {value ? <div>
        <Image
          src={value}
        />
      </div> : null}

      <Grid
        container
        spacing={8}
        alignItems="center"
      >

        <Grid
          item
        >

          <UploadIcon
            onClick={event => {

              const {
                input,
              } = this.refs;



              input.click();

            }}
          />
        </Grid>

        <Grid
          item
        >
          {onDelete
            ?
            <IconButton
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
            : null
          }

        </Grid>

      </Grid>

      <input
        type="file"
        ref="input"
        style={{
          display: "none",
        }}
        {...other}
      />

    </div>

  }

}


export default class UserProfileAvatar extends Component {

  static propTypes = {
    onUpload: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    editable: true,
  };


  constructor(props) {

    super(props);

    this.state = {
      // file: null,
    };

  }


  onUpload(r) {


    // const {
    //   onUpload,
    // } = r.data;

    const {
      onUpload,
      ...other
    } = this.props;


    return onUpload ? onUpload(r, other) : false;

    // this.setState({
    //   file: singleUpload,
    // });

  }


  render() {

    // const {
    //   file,
    // } = this.state;

    const {
      editable,
      ...other
    } = this.props;

    // if(!user){
    //   return null;
    // }

    // const {
    //   photo,
    // } = user;


    return (
      <SingleUploaderInput
        onUpload={result => this.onUpload(result)}
        FileInput={FileInput}
        editable={editable}
        {...other}
      />
    )
  }
}
