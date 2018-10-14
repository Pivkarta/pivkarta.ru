
import './styles/less/old/styles.css';
import './styles/less/styles.css';
import './styles/sass/styles.css';

import React, { Component } from "react";

import PropTypes from "prop-types";

import {App as PrismaApp} from "@prisma-cms/front";

import Renderer from "./components/Renderer";

import GeoProvider from "src/modules/geo-provider";

import 'moment/locale/ru';

import Scroller from "src/modules/Scroller";

import {
  cities,
} from "src/modules/query";
import { compose, graphql } from 'react-apollo';

import * as queryFragments from "./schema/generated/api.fragments";



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
      variables: {
        orderBy: "name_ASC",
      },
    }
  },
}))(RendererProviderClass);


export default class App extends PrismaApp {

  static defaultProps = {
    ...PrismaApp.defaultProps,
    Renderer: RendererProvider,
    queryFragments,
    lang: "ru",
    themeOptions: {
      direction: 'ltr',
      paletteType: 'light',
    },
  }

}
