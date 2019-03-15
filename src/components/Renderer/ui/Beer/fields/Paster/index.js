import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

class BeerPaster extends Component {

  static contextType = Context;

  static propTypes = {
    fullWidth: PropTypes.bool,
    value: PropTypes.bool,
  };

  static defaultProps = {
    fullWidth: false,
  }

  render() {

    const {
      inputProps,
      fullWidth,
      value,
      ...other
    } = this.props;

    const {
      Autocomplete,
    } = this.context;


    let items = [{
      id: "Не указано",
      label: "Не указано"
    }, {
      id: "Пастеризованное",
      label: "Пастеризованное"
    }, {
      id: "Непастеризованное",
      label: "Непастеризованное"
    }];


    return <Autocomplete
      value={value || ""}
      inputProps={{
        fullWidth,
        ...inputProps,
      }}
      items={items}
      {...other}
    />
  }

}


export default BeerPaster;