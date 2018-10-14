import React, { Component } from 'react'
import PropTypes from 'prop-types'


// import Beers from '../../../../../Beers/connector';
import Beers from 'src/modules/Page/Beers/connector';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

// import Table, {
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from 'material-ui/Table';

import Grid from 'material-ui/Grid';
// import TextField from 'material-ui/TextField';
// import OkIcon from 'material-ui-icons/DoneAll';


// import BeerContainer from 'src/modules/ui/Select/Beer/Container';
// import BeerColor from 'src/modules/ui/Select/Beer/Color';

// import BeerLink from 'src/modules/ui/Link/Beer';
// import Image from 'src/modules/ui/Image';

import BeersView from './View';

export default class PlaceBeers extends Component {

  static propTypes = {
    // object: PropTypes.object.isRequired,
  }

  static defaultProps = {
    exists: true,
  }


  constructor (props){

    super();

    const {
      exists,
    } = props; 

    this.state = {
      exists,
    }

  }


  onChange = event => {

    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value,
    });

  }

  render() {

    const {
      place,
      inEditMode,
      ...other
    } = this.props;

    const {
      name,
      container,
      color,
      exists,
    } = this.state;




    if (!place) {
      return null;
    }


    const {
      id: placeId,
    } = place;


    let where = {};

    // if (name) {
    //   where.name_contains = name;
    // }

    // if (color) {
    //   where.color = color;
    // }

    // if (container) {
    //   where.container = container;
    // }

    if (exists) {
      where.places_some = {
        Place: {
          id: placeId,
        }
      };
    }


    let filters = [];

    inEditMode && filters.push(<Grid
      item
    >

      <FormControlLabel
        control={
          <Switch
            name="exists"
            checked={exists ? true : false}
            onChange={event => {

              const {
                name,
                checked,
              } = event.target;

              this.setState({
                [name]: checked,
              });

            }}
            color="primary"
          />
        }
        label="Есть здесь"
      />

    </Grid>);


    return (


      <Grid
        container
      >

        

        <Grid
          item
          xs={12}
        >

          <Beers
            View={BeersView}
            place={place}
            first={100}
            orderBy="name_ASC"
            filters={filters}
            where={where}
            inEditMode={inEditMode}
            // setFilter={data => this.setState(data)}
            {...other}
          />

        </Grid>

      </Grid>
    )
  }
}


