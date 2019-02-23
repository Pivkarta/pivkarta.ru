import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

class BeerFiletered extends Component {

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
      id: "Фильтрованное",
      label: "Фильтрованное"
    }, {
      id: "Нефильтрованное",
      label: "Нефильтрованное"
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


export default BeerFiletered;