import React from 'react'
// import PropTypes from 'prop-types'

import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// import Pagination from '../../../Pagination';

import TableView from '../../../GridView/Table';


import CommentView from 'src/modules/ui/Comment/View';

let {...propTypes} = TableView.propTypes;

let {...defaultProps} = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Комментарии",
  limit: 3,
});



export default class CommentsPageView extends TableView {

  
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
      edges: comments,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};

    if(!comments || !comments.length){
      return <Typography>
        Нет ни одной публикации
      </Typography>
    }

    
    return super.render(<Grid
      container
    >

      {comments.map(({ node: item }) => {

        let {
          id,
        } = item;

        return <Grid
          key={id}
          item
          xs={12}
        >
          <CommentView
            data={{
              object: item,
            }}
            showLink={true}
          />
        </Grid>

      })}

      {/* {comments ? <Grid
        item
        xs={12}
        
      >
        <Pagination
          limit={limit}
          total={count}
          page={page || 1}
        />
      </Grid> : null} */}

    </Grid>);



    // return comments.map(({node}) => {

    //   const {
    //     id,
    //   } = node;

    //   return null

    // });
  }

}

