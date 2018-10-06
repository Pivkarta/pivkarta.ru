
import React, {Component} from "react";

import PropTypes from "prop-types";


import CutIcon from "material-ui-icons/ShortText";

import { EditorState, Modifier } from 'draft-js';

export default class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = (event) => {


    const { editorState, onChange } = this.props;
    let selection = editorState.getSelection();

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('CUT', 'IMMUTABLE', {})
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      ` `,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // insert a blank space after link
    // selection = newEditorState.getSelection().merge({
    //   anchorOffset: selection.get('anchorOffset') + linkTitle.length,
    //   focusOffset: selection.get('anchorOffset') + linkTitle.length,
    // });
    // newEditorState = EditorState.acceptSelection(newEditorState, selection);
    // contentState = Modifier.insertText(
    //   newEditorState.getCurrentContent(),
    //   selection,
    //   '',
    //   newEditorState.getCurrentInlineStyle(),
    //   undefined,
    // );
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));

  };

  render() {
    return (
      <div
        onClick={this.addStar}
        className="rdw-option-wrapper"
        style={{
          marginTop: 5,
        }}
      >
        <CutIcon />
      </div>
    );
  }
}