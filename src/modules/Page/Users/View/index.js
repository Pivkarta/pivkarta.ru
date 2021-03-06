import React, {Fragment} from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import {
  styles,
  TableView,
} from 'apollo-cms/lib/DataView/List/Table';

import {Link} from 'react-router-dom';


import UserLink from 'src/modules/ui/User/Link';

import Header from './Header';
// import Body from './Body';

import Pagination from '../../../Pagination';

import moment from 'moment';

let {...propTypes} = TableView.propTypes;

let {...defaultProps} = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Пользователи",
  limit: 10,
  Header,
  // Body,
  withPagination: true,
});

export class UsersPageView extends TableView {

  
  static propTypes = propTypes;

  static defaultProps = defaultProps;


  getColumns(){

    return [
      { 
        id: 'username', 
        numeric: false, 
        disablePadding: false, 
        label: 'Пользователь', 
        renderer: (value, record) => {

          // const {
          //   fullname,
          // } = record;

          return <UserLink 
            user={record}
          />;

          // return <Link
          //   to={`/profile/${value}`}
          // >
          //   {fullname || value}
          // </Link>

        } 
      },
      { 
        id: 'created_at', 
        numeric: false, 
        disablePadding: false, 
        label: 'Дата регистрации', 
        renderer: (value, record) => {

          // const {
          //   fullname,
          // } = record;

          // return <UserLink 
          //   user={record}
          // />;

          // return "sdfdsf";

          // return <Link
          //   to={`/profile/${value}`}
          // >
          //   {fullname || value}
          // </Link>

          return value ? moment(value).format("LL") : "";

        } 
      },
    ];
  }


  render(){

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

      {super.render()}

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


export default withStyles(styles)(UsersPageView);