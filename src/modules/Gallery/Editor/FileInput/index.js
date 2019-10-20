import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles';

import UploadIcon from 'material-ui-icons/CloudUpload';

const styles = {
  root: {
    height: 50,
    maxWidth: 210,
    padding: 5,
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    border: "2px dotted #ddd",
    "&:hover": {
      borderColor: "#bbb",
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: 10,
  },
}


class FileInput extends Component {


  static propTypes = {
    classes: PropTypes.object.isRequired,
  };


  render() {

    const {
      onChange,
      multiple,
      classes,
      ...other
    } = this.props;

    return <div
      className={classes.root}
      style={{
      }}
      onDragOver={event => {

        event.preventDefault();
      }}
      onDrop={(event) => {
        // alert("Sdfdsf");




        
        event.preventDefault();

        let valid = true;

        const {
          files,
        } = event.dataTransfer;

        onChange({
          target: {
            validity: {
              valid,
            },
            files,
          },
        });

        // for (var i in event.dataTransfer.items) {

        //   const item = event.dataTransfer.items[i];



        //   const {
        //     kind,
        //   } = item;

        //   if (kind === "file") {
        //     const file = item.getAsFile();



        //     // onUpload(file);

        //     onChange(file);

        //   }

        // }


      }}
      onClick={event => {
        this.input.click();
      }}
    >
      <input 
        type="file"
        multiple={multiple}
        ref={input => {

          this.input = input;
        }}
        onChange={onChange}
        style={{
          display: "none",
        }}
      />
      <UploadIcon 
        className={classes.icon}
      /> Для загрузки перетащие изображения сюда
    </div>
  }
}

export default withStyles(styles)(FileInput);