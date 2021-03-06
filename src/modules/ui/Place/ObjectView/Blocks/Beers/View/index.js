import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import OkIcon from 'material-ui-icons/DoneAll';


import {
  togglePlaceBeer,
} from 'src/modules/query';

import Row from './Row';

import CustomComponent from "Component";

export default class BeersView extends CustomComponent{

  static contextTypes = {
    // client: PropTypes.object.isRequired,
    ...CustomComponent.contextTypes,
    refetch: PropTypes.func,
  }


  togglePlaceBeer = async (beerId, checked) => {

    const {
      place,
      refetch,
    } = this.props;


    const {
      id: placeId,
    } = place;




    const {
      client,
    } = this.context;

    await this.mutate({
      mutation: togglePlaceBeer,
      variables: {
        placeId,
        beerId,
        active: checked,
      },
    })
      .then(r => {
        refetch && refetch();
        return r;
      })
    // .catch(e => {
    //   alert(e.message);
    //   console.error(e)
    // });

  }


  render() {


    const {
      data,
      place,
      onSearchChange,
      setFilter,
      inEditMode,
    } = this.props;

    if (!data) {
      return null;
    }


    // const {

    // } = this.state;


    const {
      beers,
    } = place;

    const {
      edges,
    } = data.objectsConnection || {};

    let objects = edges ? edges.map(n => n.node) : [];

    if (!edges || !edges.length) {
      return null;
    }

    return super.render(<div
      style={{
        width: "100%",
        overflow: "auto",
      }}
    >
      <Table
        style={{
          width: "100%",
        }}
      >

        <TableHead>

          <TableRow>

            {inEditMode ? <TableCell>

            </TableCell> : null}

            <TableCell>

            </TableCell>

            <TableCell>
              Название
            </TableCell>

            <TableCell>
              Стоимость
            </TableCell>

            <TableCell>
              Тара
            </TableCell>

            <TableCell>
              Цвет
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {objects.map(n => {

            return <Row
              key={n.id}
              // item={n}
              data={{
                object: n,
              }}
              beers={beers}
              togglePlaceBeer={this.togglePlaceBeer}
              setFilter={setFilter}
              inEditMode={inEditMode}
            />

          })}

        </TableBody>

      </Table>
    </div>);
  }

}
