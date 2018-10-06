import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Renderer from './Renderer';

import 'moment/locale/ru';
// import moment from 'moment';

import Scroller from "Scroller";

import {
  cities,
} from "query";


import { compose, graphql } from 'react-apollo';

import UriProvider from "uri-provider";
import GeoProvider from "geo-provider";

// console.log("cities", cities);

export class App extends Component {

  static propTypes = {
    // prop: PropTypes
  }


  static contextTypes = {
    user: PropTypes.object,
    errors: PropTypes.array,
    client: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
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


  componentDidMount() {

    const {
      router: {
        history,
      },
    } = this.context;

    if (typeof window !== "undefined") {

      history.listen(function (location) {

        // window.gtag && window.gtag('send', 'pageview', location.pathname);

        // Это надо чтобы при смене страницы отправлялась статистика в поисковик
        let {
          yaCounter40088775,
          gtag,
        } = global;

        gtag && gtag('event', 'page_view', {
          send_to: 'UA-110610829-1',
          page_path: location.pathname,
          page_title: window.document.tittle,
          page_location: location.toString(),
        });

        // console.log("history.listen", history.listen, gtag, yaCounter40088775);

        if (typeof yaCounter40088775 === "object") {

          yaCounter40088775.clickmap && yaCounter40088775.clickmap().hit(location.pathname);

        }

      });


    }

    super.componentDidMount && super.componentDidMount();
  }


  componentWillMount() {

    if (typeof window !== "undefined") {

      // console.log("sdfsdf componentWillMount");

      // Удаляем стили, сгенерированные сервером, так как они могут не соответствовать реальным стилям
      let styles = document.querySelector("#server-side-jss");

      styles && styles.remove();

    }

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    // console.log("App props", this.props);

    const {
      // client,
    } = this.context;

    const {
      cities: {
        objects: cities,
      },
      ...other
    } = this.props;

    return (
      <UriProvider>
        <GeoProvider>
          <Scroller>
            <Renderer
              // client={client}
              {...other}
            >
            </Renderer>
          </Scroller>
        </GeoProvider>
      </UriProvider>
    )
  }
}


export default compose(graphql(cities, {
  name: "cities",
  options: props => {

    return {
      varisbles: {
        orderBy: "name_ASC",
      },
    }
  },
}))(App);
