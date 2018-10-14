import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SingleUploaderInput from 'src/modules/react-cms-uploads/src/components/uploader/SingleUploader';

import Button from 'material-ui/Button/Button';

import Avatar from 'src/modules/ui/Avatar';

import NoPhoto from 'material-ui-icons/PersonOutline';

class FileInput extends Component{


  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render(){

    const {
      // onChange,
      user,
      editable,
      ...other
    } = this.props;

    const {
      image,
    } = user;

    const onClick = editable ? event => {

      const {
        input,
      } = this.refs;



      input.click();

    } : undefined;

    return <div>

      {/* <Button
        onClick={event => {

          const {
            input,
          } = this.refs;



          input.click();

        }}
        >
        Выбрать файл
      </Button> */}



      {image ? <Avatar 
        user={user}
        size="big"
        onClick={onClick}
        editable={editable}
        />
        :
        <NoPhoto 
        onClick={onClick}
        style={{
          fontSize: "7rem",
          color: "#ddd",
          border: "1px solid #ddd",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
      }

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
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  }


  constructor(props){

    super(props);

    this.state = {
      // file: null,
    };

  }


  onUpload(r){


    const {
      singleUpload,
    } = r.data;

    const {
      updateUser,
    } = this.props;


    updateUser(singleUpload)

    // this.setState({
    //   file: singleUpload,
    // });

  }


  render() {

    const {
      file,
    } = this.state;

    const {
      user,
      editable,
    } = this.props;

    if(!user){
      return null;
    }

    // const {
    //   photo,
    // } = user;


    return (
      <div>

        

        <SingleUploaderInput 
          onUpload={result => this.onUpload(result)}
          FileInput={FileInput}
          editable={editable}
          user={user}
        />

      </div>
    )
  }
}
