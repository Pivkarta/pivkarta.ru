

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';


import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import Switch from 'material-ui/Switch';
import SaveIcon from 'material-ui-icons/Save';

import BeerLink from 'src/modules/ui/Link/Beer';
import Image from 'src/modules/ui/Image';

import Price from './Price';

import {
  updatePlaceBeer,
} from 'src/modules/query';

import { withStyles } from 'material-ui';


const styles = {
  table: {
    "& td": {
      padding: 5,
    },
  },
};

export class PlaceBeerRow extends EditableView {

  static propTypes = {
    data: PropTypes.object.isRequired,
    beers: PropTypes.array,
    togglePlaceBeer: PropTypes.func.isRequired,
    setFilter: PropTypes.func,
    inEditMode: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  }



  updatePlaceBeer = async ({ variables }) => {

    const {
      client,
    } = this.context;
 
    let mutation = updatePlaceBeer;
  

    return await client.mutate({
      mutation,
      variables,
    })
      .then(r => {

        return r;
      })
      .catch(e => {
        // console.error(e);

        return e;
      });;

  }

  render() {

    const {
      // item,
      beers,
      togglePlaceBeer,
      setFilter,
      inEditMode,
      // data,
      classes,
    } = this.props;

    const item = this.getObjectWithMutations();


    const {
      id: beerId,
      name,
      color,
      container,
      container_str,
      image,
    } = item;

    let placeBeer = beers ? beers.find(i => i.Beer.id === beerId) : null;

    // const isDirty = this.isDirty();

    return <TableRow
      key={beerId}
      className={classes.table}
    >

      {inEditMode
        ?
        <TableCell>
          <Switch
            checked={placeBeer ? true : false}
            onChange={event => {

              const {
                name,
                checked,
              } = event.target;

              // this.setState({
              //   [name]: checked,
              // });

              togglePlaceBeer(beerId, checked);

            }}
            color="primary"
          />
        </TableCell>
        : null
      }



      <TableCell>

        {image ? <Image
          src={image}
          style={{
            width: 100,
            heigth: "auto",
          }}
        /> : ""}

      </TableCell>


      <TableCell>
        <BeerLink
          object={item}
        />
      </TableCell>

      <TableCell>

        {placeBeer ? <Price
          key={placeBeer.id}
          data={{
            object: placeBeer,
          }}
          mutate={this.updatePlaceBeer}
          inEditMode={inEditMode}
        /> : ""}

      </TableCell>


      <TableCell>
        {container_str && setFilter ?
          <a
            href="javascript:;"
            onClick={event => {
              event.preventDefault();

              setFilter({
                container,
              });

            }}
          >
            {container_str}
          </a>
          : ""}
      </TableCell>


      <TableCell>
        {color || ""}
      </TableCell>

    </TableRow>
  }
}

export default withStyles(styles)(PlaceBeerRow);
