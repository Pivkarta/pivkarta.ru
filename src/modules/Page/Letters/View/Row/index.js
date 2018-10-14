import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  TableRow,
  TableCell,
} from 'material-ui/Table';


import { Link } from 'react-router-dom';

import Image from "src/modules/ui/Image";

export default class LettersRow extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {

    const {
      item,
      ...other
    } = this.props;

    if (!item) {
      return null;
    }

    const {
      id,
      email,
      subject,
      message,
      status,
    } = item;


    return (
      <TableRow>

        <TableCell>

          {id}

        </TableCell>


        <TableCell>

          <Link
            to={`/letters/${id}`}
          >
            {email}
          </Link>

        </TableCell>

        <TableCell>

          {subject}

        </TableCell>

        <TableCell>

          {status}

        </TableCell>

      </TableRow>
    )
  }
}
