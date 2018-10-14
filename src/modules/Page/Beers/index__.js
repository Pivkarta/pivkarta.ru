
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  beersConnection,
} from 'src/modules/query';

import View from './View';



export default class BeersPage extends React.Component {

  static propTypes = {
    View: PropTypes.func.isRequired,
  }

  static contextTypes = {
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    View,
    first: 12,
  }


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
      graphql(beersConnection, {
        // name: 'items', 
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
    });

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


    return <Renderer
      addObject={event => {
        this.addObject(event);
      }}
      page={page}
      skip={skip}
      first={limit}
      {...other}
    />

  }
}


 

