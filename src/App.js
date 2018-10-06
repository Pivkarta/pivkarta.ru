
import './styles/less/old/styles.css';
import './styles/less/styles.css';
import './styles/sass/styles.css';

import React, { Component } from "react";

import PropTypes from "prop-types";

import PrismaApp from "@prisma-cms/front/lib/components/App";

import Renderer from "./components/Renderer";

import GeoProvider from "geo-provider";

import 'moment/locale/ru';

import Scroller from "Scroller";

import {
  cities,
} from "query";
import { compose, graphql } from 'react-apollo';



class RendererProviderClass extends Component {

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }


  static childContextTypes = {
    cities: PropTypes.array,
  }


  getChildContext() {

    const {
      cities: {
        objects: cities,
      },
    } = this.props;

    return {
      cities,
    };
  }


  render() {

    const {
      client,
    } = this.context;

    return <GeoProvider>
      <Scroller>
        <Renderer
          client={client}
          {...this.props}
        />
      </Scroller>
    </GeoProvider>
  }

}


const RendererProvider = compose(graphql(cities, {
  name: "cities",
  options: props => {

    return {
      varisbles: {
        orderBy: "name_ASC",
      },
    }
  },
}))(RendererProviderClass);


export default class App extends PrismaApp {

  static defaultProps = {
    ...PrismaApp.defaultProps,
    Renderer: RendererProvider,
  }

}
