import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  commentsConnection,
} from "src/modules/query";

import { compose, graphql } from 'react-apollo';

import CommentsView from "./View";

import AuthorizedAction from "src/modules/authorized-action";

import CommentIcon from 'material-ui-icons/Comment';

import CommentViewComponent from "src/modules/ui/Comment/View";
import Button from 'material-ui/Button';


class Comments extends Component {

  static propTypes = {
    object_id: PropTypes.number.isRequired,
    type_id: PropTypes.number.isRequired,
    object: PropTypes.object.isRequired,
    showReplyButtons: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    showReplyButtons: true,
  }

  state = {}

  render() {


    const {
      data: {
        objectsConnection,
      },
      object,
      showReplyButtons,
      object_id,
      type_id,
    } = this.props;


    if (!objectsConnection || !object) {
      return null;
    }


    const {
      showEditor,
    } = this.state;

    const {
      aggregate: {
        count,
      },
      edges,
    } = objectsConnection;

    const comments = edges.map(({ node }) => node);


    return (
      <div>
        <CommentsView
          comments={comments}
          parent={null}
          showReplyButtons={showReplyButtons}
        />

        {showEditor
          ?
          <CommentViewComponent
            data={{
              object: {},
            }}
            // readOnly={false}
            _dirty={{
              object_id,
              type_id,
            }}
            onSave={event => {
              this.setState({
                showEditor: false,
              });
            }}
          />
          :
          object_id
            ?
            <AuthorizedAction>
              <Button
                onClick={event => {
                  this.setState({
                    showEditor: true,
                  })
                }}
              >
                <CommentIcon /> Написать комментарий
              </Button>
            </AuthorizedAction>
            : null
        }
      </div>
    );
  }
}


/**
 * 
 */
export default compose(graphql(commentsConnection, {

  options: props => {

    const {
      commentGetAuthor = true,
      orderBy = "createdAt_ASC",
      type_id,
      where,
      ...other
    } = props;




    return {
      ...other,
      variables: {
        commentGetAuthor,
        orderBy,
        where: {
          ...where,
          // object_id,
          // type_id,
        },
      },
    }
  }
}))(Comments);
