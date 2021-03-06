import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentView from "src/modules/ui/Comment/View";


export default class CommentsView extends Component {

  static propTypes = {
    parent: PropTypes.string,
    comments: PropTypes.array.isRequired,
    level: PropTypes.number.isRequired,
  }

  static defaultProps = {
    level: 0,
  }

  state = {}

  render() {

    let {
      parent,
      comments,
      level,
      showReplyButtons,
      ...other
    } = this.props;

    const {
    } = this.state;



    const filteredComments = comments.filter(n => n.parent === parent);



    if (!filteredComments.length) {
      return null;
    }


    const commentsContent = filteredComments.map(n => {

      const {
        id,
      } = n;

      return <div
        key={id}
        style={{
          marginLeft: level > 0 && level < 6 ? 20 : undefined,
          // marginLeft:30,
        }}
      >
        <CommentView
          data={{
            object: n,
          }}
          showReplyButtons={showReplyButtons}
        />

        {id ? <div
        >
          <CommentsView
            parent={id}
            comments={comments}
            level={level + 1}
            showReplyButtons={showReplyButtons}
            {...other}
          />
        </div> : null}

      </div>

    });

    return (
      commentsContent
    )
  }
}
