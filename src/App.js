

import React, { Component } from "react";

import PropTypes from "prop-types";

import PrismaApp from "@prisma-cms/front/lib/components/App";

import Renderer from "./components/Renderer";

class RendererProvider extends Component {

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }


  render() {

    const {
      client,
    } = this.context;

    return <Renderer
      client={client}
      {...this.props}
    />
  }

}

export default class App extends PrismaApp {

  static defaultProps = {
    ...PrismaApp.defaultProps,
    Renderer: RendererProvider,
  }

}
