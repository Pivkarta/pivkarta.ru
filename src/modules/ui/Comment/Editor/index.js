import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from 'material-ui';

import Editor from 'src/modules/ui/Editor';

// import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

// const styles = {};

// class EditableComment extends EditableView {

//   static propTypes = {
//     ...EditableView.propTypes,
//     classes: PropTypes.object.isRequired,
//   };

//   static defaultProps = {
//     ...EditableView.defaultProps,
//     data: {},
//   };

//   renderDe () {

//     const {
//       classes,
//       ...other
//     } = this.props;

//     return (
//       <Editor
//         {...other}
//       />
//     );
//   }
// }


export default class CommentEditor extends Component {



  render() {

    const {
      // readOnly,
      error,
      helperText,
      ...other
    } = this.props;


    return <div
      style={error ? {
        border: "1px solid red",
        padding: 3,
      } : undefined}
    >
      <Editor

        toolbar={{
          options: ['inline', 'list', 'link', 'image', 'emoji', 'embedded', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline'],
            bold: { className: 'bordered-option-classname' },
            italic: { className: 'bordered-option-classname' },
            underline: { className: 'bordered-option-classname' },
            strikethrough: { className: 'bordered-option-classname' },
          },
        }}
        {...other}
      />

      {helperText ? <div>
        <hr 
          style={{
            margin: "5px 0",
          }}
        />
        <Typography
          color={error ? "secondary" : "textSecondary"}
        >
          {helperText}
        </Typography>
      </div> : null}
    </div>

  }

}


// export default withStyles(styles)(CommentEditor);