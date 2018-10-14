
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  usersConnection,
} from 'src/modules/query';

import View from './View';



import Page from '../layout';

const propTypes = Object.assign({...Page.propTypes}, {
  View: PropTypes.func.isRequired,
});


const defaultProps = Object.assign({...Page.defaultProps}, {
  View,
  first: 10,
  orderBy: "user_id_ASC",
});


export default class UsersPage extends Page {

  static propTypes = propTypes

  static defaultProps = defaultProps


  constructor(props){

    super(props);

    this.state = {}
  }


  addObject(event){

    const {
      history,
    } = this.props;

    history.push(`/places/create/`);

  }


  componentWillMount(){

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(usersConnection, {
        // name: 'items', 
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
    });

    this.setPageMeta({
      title: "Пользователи",
    });

    super.componentWillMount && super.componentWillMount();
    
  }


  render() {

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
    } = this.context;

    
    const {
      search,
    } = location;



    let {
      page,
    } = search || {};

    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;


    return super.render(<Renderer
      addObject={event => {
        this.addObject(event);
      }}
      page={page}
      skip={skip}
      first={limit}
      limit={limit}
      {...other}
    />)

  }

}


 

