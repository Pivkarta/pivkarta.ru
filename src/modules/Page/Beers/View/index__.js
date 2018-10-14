import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';

import {
  styles,
  TableView,
} from 'apollo-cms/lib/DataView/List/Table';

import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Pagination from '../../../Pagination';

let {...propTypes} = TableView.propTypes;

let {...defaultProps} = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Заведения",
  limit: 5,
});

export class BeerPageView extends TableView {

  
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  
  render(){

    const {
      limit,
      page,
    } = this.props;

    const {
      objectsConnection,
    } = this.props.data;
    
    const {
      edges: beers,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};

    if(!beers || !beers.length){
      return <Typography>
        Нет ни одной публикации
      </Typography>
    }

    
    return <Grid
      container
    >

      {beers.map(({ node: item }) => {

        let {
          id,
          beer_id,
          name,
          url_name,
          description,
          editor_content,
          country,
          image,
          num_comments,
          num_photos,
          manufacturer,
          alcohol,
          wort_percent,
          components,
          bitter,
          type_id,
          color,
          is_request,
          rating,
        } = item;


        // let url = cityAlias ? `/${cityAlias}/sort/show/${id}/${alias}/` : `/${uri}`;
        let url = `/beer/${beer_id}/${url_name}`;

        // const {
        //   slider_thumb: image,
        // } = imageFormats || {};

        if (!image) {
          return null;
        }

        // image = image ? `/images/avatar/uploads/${image}` : "";
        image = image ? `/images/resized/slider_thumb/uploads/${image}` : "";

        return <Grid
          key={id}
          item
          xs={12}
          md={4}
          lg={3}
        >
          <Link
            to={url}
            href={url}
            title={name}
          >

            <img
              src={image}
              style={{
                width: "100%",
              }}
            />
            <Typography
              type="subheading"
            >
              {name}
            </Typography>

          </Link>
        </Grid>

      })}

      {beers ? <Grid
        item
        xs={12}
        
      >
        <Pagination
          limit={limit}
          total={count}
          page={page || 1}
        />
      </Grid> : null}

    </Grid>;



    // return beers.map(({node}) => {

    //   const {
    //     id,
    //   } = node;

    //   return null

    // });
  }

}


export default withStyles(styles)(BeerPageView);