
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import {
  styles,
  TableView,
} from 'apollo-cms/lib/DataView/List/Table';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Pagination from '../../Pagination';


const propTypes = Object.assign({...TableView.propTypes}, {
  withPagination: PropTypes.bool.isRequired,
  classes: PropTypes.object,
});

const defaultProps = Object.assign({...TableView.defaultProps}, {
  withPagination: true,
});

export default class AppTableView extends TableView{


  static propTypes = propTypes;

  static defaultProps = defaultProps;

  
  render(content){

    const {
      limit,
      page,
      withPagination,
    } = this.props;



    const {
      objectsConnection,
    } = this.props.data;
    
    const {
      edges,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};

    if(!edges || !edges.length){
      return <Typography>
        Данные не были получены
      </Typography>
    }

    
    return <Fragment>

      {content}

      {withPagination ? <Grid
        container
        spacing={0}
      >
  

        {edges && edges.length ? <Grid
          item
          xs={12}
          
        >
          <Pagination
            limit={limit}
            total={count}
            page={page || 1}
            style={{
              marginTop: 20,
            }}
          />
        </Grid> : null
        }

      </Grid> : null
    }

    </Fragment>;

  }

}

// export default withStyles(styles)(AppTableView);