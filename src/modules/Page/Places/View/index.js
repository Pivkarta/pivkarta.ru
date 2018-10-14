import React from 'react'
// import PropTypes from 'prop-types'

import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Pagination from '../../../Pagination';

import TableView from '../../../GridView/Table';

import PlaceImage from 'src/modules/ui/Image/Place';

import PlaceListView from "src/modules/ui/Place/ListView";

let {...propTypes} = TableView.propTypes;

let {...defaultProps} = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Заведения",
  limit: 3,
});



export default class PlacePageView extends TableView {

  
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  
  componentWillMount(){

    const {
      setPageMeta,
    } = this.props;


    setPageMeta && setPageMeta();

    super.componentWillMount && super.componentWillMount();
  }


  render(){

    const {
      limit,
      page,
    } = this.props;

    const {
      objectsConnection,
      loading,
    } = this.props.data;
    
    const {
      aggregate,
      edges,
    } = objectsConnection || {};

    const {
      count,
    } = aggregate || {};

    if(!edges || !edges.length){

      if(loading){
        return null;
      }

      return <Typography>
        Не найдено ни одно заведение
      </Typography>
    }


    const places = edges.map(({node}) => node);

    
    return (<Grid
      container
      spacing={24}
    >

      {places.map((item) => {

        let {
          id,
          place_id,
          url_name,
        } = item;


        // let url = cityAlias ? `/${cityAlias}/sort/show/${id}/${alias}/` : `/${uri}`;
        let url = `/place/${place_id}/${url_name}`;

        // const {
        //   slider_thumb: image,
        // } = imageFormats || {};

        // if (!image) {
        //   return null;
        // }

        // image = image ? `/images/resized/slider_thumb/uploads/${image}` : "";

        return <Grid
          key={id}
          item
          xs={12}
          sm={6}
          md={3}
          lg={2}
        >
          <PlaceListView 
            data={{
              object: item,
            }}
          />
        </Grid>

        // return <Grid
        //   key={id}
        //   item
        //   xs={12}
        //   sm={6}
        //   md={4}
        //   lg={3}
        //   style={{
        //     marginBottom: 20,
        //   }}
        // >
        //   <Link
        //     to={url}
        //     href={url}
        //     title={name}
        //     style={{
        //       display: "flex",
        //       height: "100%",
        //       // border: "1px solid",
        //       flexDirection: "column",
        //       flexBasis: "100%",
        //     }}
        //   >

        //     <Typography
        //       variant="title"
        //     >
        //       {name}
        //     </Typography>

        //     <Typography
        //       variant="subheading"
        //       style={{
        //         flexGrow: 1,
        //         marginBottom: 3,
        //       }}
        //     >
        //       {address}
        //     </Typography>

        //     <PlaceImage
        //       src={image}
        //       type="slider_thumb"
        //       style={{
        //         width: "100%",
        //       }}
        //       // is_bar={is_bar}
        //       // is_shop={is_shop}
        //       // is_brewery={is_brewery}
        //     />

        //   </Link>
        // </Grid>

      })}

      {places ? <Grid
        item
        xs={12}
        
      >
        <Pagination
          limit={limit}
          total={count}
          page={page || 1}
        />
      </Grid> : null}

    </Grid>);



    // return places.map(({node}) => {

    //   const {
    //     id,
    //   } = node;

    //   return null

    // });
  }

}

