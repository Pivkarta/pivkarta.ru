
import React, { Component } from "react";

import App from "../../../../App";

import MainApp from "../../../front/App";

export default class TestApp extends Component {

  render() {

    return <MainApp
      App={App}
      lang="ru"
      {...this.props}
    />
  }
}