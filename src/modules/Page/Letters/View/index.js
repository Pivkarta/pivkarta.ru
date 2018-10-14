import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import ClearIcon from 'material-ui-icons/Clear';

import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableRowColumn,
  TableCell,
} from 'material-ui/Table';

import Row from './Row';

import Pagination from 'src/modules/Pagination';

import CustomComponent from "Component";


export default class LettersView extends CustomComponent {

  static propTypes = {
    data: PropTypes.object,
  }


  state = {
    // newAction: false,
  }


  // onChange = event => {

  //   const {
  //     name,
  //     value,
  //   } = event.target;


  //   this.setFilters({
  //     [name]: value ? value : undefined,
  //   });

  // }

  render() {

    const {
      data: {
        objectsConnection,
        loading,
        variables: {
          first: limit,
        },
      },
      page,
    } = this.props;


    const {
    } = this.state;


    let items = [];
    let pagination;


    if (!objectsConnection && loading) {
      return null;
    }

    if (objectsConnection) {

      const {
        aggregate: {
          count,
        },
        edges,
      } = objectsConnection;

      items = edges.map(n => ({ ...n.node }));

      pagination = <Pagination
        limit={limit}
        total={count}
        page={page || 1}
      />

    }


    // const name = this.getLocationQuery("name");
    // const aggregator = this.getLocationQuery("aggregator");


    return super.render(
      <Fragment>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                ID
              </TableCell>

              <TableCell>
                Емейл
              </TableCell>

              <TableCell>
                Тема
              </TableCell>

              <TableCell>
                Статус
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {items.map(n => {

              const {
                id,
              } = n;

              return <Row
                key={id}
                item={n}
              />

            })}

          </TableBody>

        </Table>

        {pagination}

      </Fragment>
    )
  }
}
