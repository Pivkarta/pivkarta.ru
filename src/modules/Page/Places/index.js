
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  mapPlacesConnection,
} from 'src/modules/query';

import View from './View';

import { Link } from 'react-router-dom';

import AddLink from "src/modules/ui/AddLink";

import Page from '../layout';



import AuthorizedAction from 'src/modules/authorized-action';


const propTypes = Object.assign({ ...Page.propTypes }, {
  View: PropTypes.func.isRequired,
});


const defaultProps = Object.assign({ ...Page.defaultProps }, {
  View,
  first: 12,
  // renderWithPagination: true,
});


export default class PlacesPage extends Page {

  static propTypes = propTypes

  static defaultProps = defaultProps


  // static contextTypes = {
  //   ...Page.contextTypes,
  //   getGeoCoords: PropTypes.func.isRequired,
  // }

  constructor(props) {

    super(props);

    this.state = {}
  }


  // addObject(event){

  //   const {
  //     history,
  //   } = this.props;

  //   history.push(`/places/create/`);

  // }


  componentWillMount() {

    const {
      View,
    } = this.props;


    const {
      Renderer,
    } = this.state;

    if(!Renderer){

      const Renderer = compose(
        graphql(mapPlacesConnection, {
          // name: 'items', 
        }),
  
      )(View);
  
      Object.assign(this.state, {
        Renderer,
      });
      
    }


    super.componentWillMount && super.componentWillMount();

  }


  setPageMeta(meta) {




    if (meta === undefined) {

      let title;


      const {
        type,
      } = this.props;

      switch (type) {

        case "shop":
          title = "Магазины разливного, крафтового и серийного пива";
          break;

        case "bar":
          title = "Бары, пабы, спорт-бары, пивные рестораны";
          break;

        case "brewery":
          title = "Пивоварни разливного, крафтового пива";
          break;

        default: title = "Все Бары, пабы, спорт-бары, пивные рестораны";
      }




      meta = {
        title,
      };

    }


    return super.setPageMeta(meta);

  }



  render(content) {

    /**
     * Это чтобы на странице создания выводилось
     */
    if (content !== undefined) {
      return super.render(content);
    }


    const {
      View,
      first: limit,
      ...other
    } = this.props;


    const {
      Renderer,
    } = this.state;

    const {
      location,
      // router,
      user: currentUser,
    } = this.context;


    const center = this.getCoords();


    const {
      search,
    } = location;



    let {
      page,
    } = search || {};

    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;


    return super.render(<div>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <AuthorizedAction
        // onError={event => {

        // }}
        >
          <AddLink
            to="/places/create/"
            title="Добавить заведение"
          />
        </AuthorizedAction>
      </div>

      <div>
        <Renderer
          // addObject={event => {
          //   this.addObject(event);
          // }}
          page={page}
          skip={skip}
          first={limit}
          limit={limit}
          center={center}

          /**
            Этот хак сделан для того, чтобы на странице города можно было установить титл страницы
           */
          setPageMeta={meta => this.setPageMeta(meta)}

          {...other}
        />
      </div>

    </div>);

  }
}




