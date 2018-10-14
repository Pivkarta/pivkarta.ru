import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editor from 'src/modules/@fi1osof/react-draft-wysiwyg/lib';

import { 
  // Editor, 
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

export default class EditorField extends Component {

  static propTypes = {
    onChange: PropTypes.func,
  }


  constructor(props){

    super(props);

    const {
      value,
    } = props;

    let editorState;

    if(value){

      // let {
      //   ...blockArray,
      // } = value;

      
      try{

        
        var contentState = convertFromRaw(value);
  


        // var contentState = ContentState.createFromBlockArray(blockArray);


        
        // editorState = EditorState.createWithContent(contentState);
        editorState = EditorState.createWithContent(contentState);



      }
      catch(e){
        console.error(e);
      }

    }

    this.state = {
      editorState,
    };

  }


  onChange = (editorState, rawContent) => {



    const {
      onChange,
    } = this.props;

    return onChange ? onChange(editorState, rawContent) : false;

  }

  onEditorStateChange = (editorState) => {





    this.onChange(editorState, convertToRaw(editorState.getCurrentContent()));

    this.setState({
      editorState,
    });

  }


  render() {
    
    const {
      value,
      onChange,
      ...other
    } = this.props;

    const {
      editorState,
    } = this.state;

    return (

      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        {...other}
      />
      
    )
  }
}
