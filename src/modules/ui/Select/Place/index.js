import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  places as objectsQuery,
  place as objectQuery,
} from "src/modules/query";


import Select from "../";

export default class PlacesSelect extends Select {

  static defaultProps = {
    ...Select.defaultProps,
    objectQuery,
    objectsQuery,
    label: "Заведение",
  }

}
