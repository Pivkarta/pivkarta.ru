import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton';
import MultiUploader from 'react-cms-uploads/src/components/uploader/MultiUploader';

import AddIcon from 'material-ui-icons/AddCircle';

class FileInput extends Component{


  static propTypes = {
  }

  render(){

    const {
      editable,
      ...other
    } = this.props;

    return <div>
 
      <IconButton
        onClick={event => {

          const {
            input,
          } = this.refs;

          input.click();

        }}
      >
        <AddIcon 
        />
      </IconButton>

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

export default class GalleryUploader extends Component {

  static propTypes = {
    // prop: PropTypes
  }

  render() {

    const {
      children,
      ...other
    } = this.props;

    return (
      <MultiUploader
        FileInput={FileInput}
        {...other}
      />
    )
  }
}
