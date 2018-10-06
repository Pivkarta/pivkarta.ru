import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentObject extends Component {

  // static propTypes = {
  //   comment: PropTypes
  // }

  render(content) {
    return (
      <div>
        {content}
      </div>
    )
  }
}
