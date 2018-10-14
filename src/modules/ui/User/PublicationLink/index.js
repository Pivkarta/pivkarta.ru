import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment';

import Link from '../Link';

export default class PublicationUserLink extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    date: PropTypes.string,
  }

  render() {

    const {
      date,
      ...other
    } = this.props;

    return (
      <Link
        secondary={date ? <div>
          {moment(date).format('LL HH:mm:ss')}
        </div> : undefined}
        {...other}
      />
    )
  }
}
