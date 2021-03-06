
import React from 'react'
import PropTypes from 'prop-types'

// import { graphql, compose } from 'react-apollo';

// import {
//   beersConnection,
//   updateBeer,
// } from 'src/modules/query';

// import View from './View';

import Grid from 'material-ui/Grid';

// import Filters from './inc/Filters';



import Page from '../layout';

// import URI from 'urijs';

import Connector from './connector';

const propTypes = Object.assign({ ...Page.propTypes }, {
  // View: PropTypes.func.isRequired,
});


const defaultProps = Object.assign({ ...Page.defaultProps }, {
  // View,
  first: 12,
});

export default class BeersPage extends Page {

  static propTypes = propTypes

  static defaultProps = defaultProps


  state = {}


  // addObject(event) {

  //   const {
  //     history,
  //   } = this.props;

  //   history.push(`/places/create/`);

  // }


  // componentWillMount() {

  //   const {
  //     View,
  //   } = this.props;


  //   const Renderer = compose(
  //     graphql(beersConnection, {
  //       // name: 'items', 
  //     }),

  //   )(View);

  //   Object.assign(this.state, {
  //     Renderer,
  //   });

  // }


  // mutate = async ({ variables }) => {



  //   const {
  //     client,
  //   } = this.context;

  //   let {
  //     data,
  //     id,
  //   } = variables;

  //   let mutation;


  //   if (id) {

  //     mutation = updateBeer;

  //     variables = Object.assign({ ...variables }, {
  //       where: {
  //         id,
  //       },
  //     });

  //   }
  //   else {
  //     return false;
  //   }

  //   return await client.mutate({
  //     mutation,
  //     variables,
  //   })
  //     .then(r => {

  //       return r;
  //     })
  //     .catch(e => {
  //       // console.error(e);

  //       return e;
  //     });;

  // }

  // componentWillMount(){

  //   // if(!global.document){
  //   //   global.document = {
  //   //     asdasd: "DSafdsf",
  //   //   }
  //   // }





  //   // ToDo: добавить город
  //   let title = "Все сорта пива";

  //   this.setPageMeta({
  //     // title: "Каталог пива. Все сорта пива",
  //     title,
  //   });

  //   super.componentWillMount && super.componentWillMount();

  // }

  setPageMeta(meta) {
    // ToDo: добавить город

    if(meta === undefined){

      let title = "Все сорта пива";
  
      meta = {
        title,
      }
      
    }

    return super.setPageMeta(meta);
  }

  // componentWillReceiveProps(){


  // }

  // componentDidUpdate(){


  // }

  // componentWillUpdate(){


  // }


  // componentDidMount(){



  //   this.setPageMeta({
  //     title: "Каталог пива. Все сорта пива",
  //   });

  //   super.componentDidMount && super.componentDidMount();
  // }

  render() {

    const {
      ...other
    } = this.props;

    return super.render(<Connector
      key="beerConnector"
      {...other}
    />)

  }
}




