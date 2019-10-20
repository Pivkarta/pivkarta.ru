import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
// import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import BeerContainer from 'src/modules/ui/Select/Beer/Container';
import BeerColor from 'src/modules/ui/Select/Beer/Color';

import URI from 'urijs';

import Context from "@prisma-cms/context";

export default class BeersFilter extends Component {

  static propTypes = {
    container: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static contextType = Context;

  static defaultProps = {
    onChange: function (event) {

      const {
        name,
        value,
      } = event.target;

      const {
        router: {
          history,
        },
      } = this.context;

      const {
        push,
        location,
      } = history;

      let {
        pathname,
        search,
      } = location;

      let uri = new URI(pathname).query(search);

      let query = uri.query(true);

      query = {
        ...query,
        [name]: value || undefined,
        page: undefined,
      }

      uri.query(query);

      // uri.query({
      //   [name]: value,
      // });



      history.push(uri.toString());

    },
    onSubmit: function (event) {

    },
  }




  render() {

    const {
      BeerFilteredField,
      BeerPasterField,
    } = this.context;

    const {
      container,
      color,
      name,
      onChange,
      onSubmit,
      filters,
      filtered,
      pasteurized,
      ...other
    } = this.props;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit.call(this, event);
        }}
      >
        <Grid
          container
          spacing={8}
          alignItems="flex-end"
          {...other}
        >

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
          >
            <TextField
              label="Название"
              helperText="Поиск по названию"
              name="name"
              onChange={event => onChange.call(this, event)}
              value={name || ""}
              fullWidth
            />
          </Grid>

          <Grid
            item
          >
            <BeerContainer
              value={container || ""}
              onChange={event => onChange.call(this, event)}
            />
          </Grid>

          <Grid
            item
          >
            <BeerColor
              value={color || ""}
              onChange={event => onChange.call(this, event)}
            />
          </Grid>

          <Grid
            item
          >

            <BeerFilteredField
              // value={filtered === true ? "true" : filtered === false ? "false" : ""}
              value={filtered === "true" ? "Фильтрованное" : filtered === "false" ? "Нефильтрованное" : undefined}
              onSelect={(value, item) => {
                // console.log("onSelect", value, item);


                // this.updateObject({
                //   filtered: value === "filtered" ? true : value === "nonfiltered" ? false : null,
                // });

                onChange.call(this, {
                  target: {
                    name: "filtered",
                    value: value === "Фильтрованное" ? "true" : value === "Нефильтрованное" ? "false" : undefined,
                  },
                });

              }}
              inputProps={{
                helperText: "Выберите из списка",
                label: "Фильтрованность",
              }}
            />
          </Grid>

          <Grid
            item
          >

            <BeerPasterField
              // value={filtered === true ? "true" : filtered === false ? "false" : ""}
              value={pasteurized === "true" ? "Пастеризованное" : pasteurized === "false" ? "Непастеризованное" : undefined}
              onSelect={(value, item) => {
                // console.log("onSelect", value, item);


                // this.updateObject({
                //   filtered: value === "filtered" ? true : value === "nonfiltered" ? false : null,
                // });

                onChange.call(this, {
                  target: {
                    name: "pasteurized",
                    value: value === "Пастеризованное" ? "true" : value === "Непастеризованное" ? "false" : undefined,
                  },
                });

              }}
              inputProps={{
                helperText: "Выберите из списка",
                label: "Пастеризация",
              }}
            />
          </Grid>

          {filters}

        </Grid>
      </form>
    )
  }
}
