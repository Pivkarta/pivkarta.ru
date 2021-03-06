
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {
  topicsConnection,
  updateTopicProcessor,
} from 'src/modules/query';

import View from './View';



import Page from '../layout';


const propTypes = Object.assign({...Page.propTypes}, {
  View: PropTypes.func.isRequired,
});


const defaultProps = Object.assign({...Page.defaultProps}, {
  View,
  first: 10,
  renderWithPagination: true,
  createUrl: "/topics/create/",
  where: {
    published: true,
  },
});


export default class TopicsPage extends Page {

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

    const {
      Renderer,
    } = this.state;

    if(!Renderer){
      const Renderer = compose(
        graphql(topicsConnection, {
          // name: 'items', 
        }),
        graphql(updateTopicProcessor, {
        }),
      
      )(View);
  
      Object.assign(this.state, {
        Renderer,
      });
    }


    super.componentWillMount && super.componentWillMount();

  }


  setPageMeta(meta){

    return super.setPageMeta(meta || {
      title: "Все блоги",
    });

  }
  


  /**
   * Основные элементы с постраничностью отрисовываются через главный лейаут
   */

  // render(content) {

  //   /**
  //    * Это чтобы на странице создания выводилось
  //    */
  //   if(content !== undefined){
  //     return super.render(content);
  //   }


  //   const {
  //     View,
  //     first: limit,
  //     ...other
  //   } = this.props;


  //   const {
  //     Renderer,
  //   } = this.state;

  //   const {
  //     location,
  //     router,
  //     user: currentUser,
  //   } = this.context;


  //   const {
  //     route: {
  //       match: {
  //         params: {
  //           lat,
  //           lng,
  //         },
  //       },
  //     },
  //   } = router;

    
  //   const {
  //     search,
  //   } = location;



  //   let {
  //     page,
  //   } = search || {};

  //   page = parseInt(page) || 0;

  //   const skip = page ? (page - 1) * limit : 0;


  //   let center;

  //   if(lat && lng){
  //     center = {
  //       lat,
  //       lng,
  //     }
  //   }

  //   return super.render(<div>
      
  //     <div
  //       style={{
  //         marginBottom: 20,
  //       }}
  //     >
  //       <AuthorizedAction
  //         user={currentUser}
  //         // onError={event => {

  //         // }}
  //       >
  //         <Link
  //           to="/blogs/create/"
  //         >
  //           Добавить публикацию
  //         </Link>
  //       </AuthorizedAction>
  //     </div>

  //     <div>
  //       <Renderer
  //         // addObject={event => {
  //         //   this.addObject(event);
  //         // }}
  //         page={page}
  //         skip={skip}
  //         first={limit}
  //         limit={limit}
  //         center={center}
  //         {...other}
  //       />
  //     </div>

  //   </div>);

  // }
}


 

