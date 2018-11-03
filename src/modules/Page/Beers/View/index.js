import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// import Pagination from '../../../Pagination';

import TableView from '../../../GridView/Table';

import AuthorizedAction from 'src/modules/authorized-action';


import BeerView from "modules/ui/Beer/List/View";


let { ...defaultProps } = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Заведения",
  limit: 3,
});



export default class BeersPageView extends TableView {


  static propTypes = {
    ...TableView.propTypes,
  };

  static defaultProps = defaultProps;


  static contextTypes = {
    ...TableView.contextTypes,
    user: PropTypes.object,
  }


  render() {

    const {
      limit,
      page,
    } = this.props;

    const {
      user: currentUser,
    } = this.context;

    const {
      objectsConnection,
      loading,
    } = this.props.data;

    const {
      edges: beers,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};

    if (!beers || !beers.length) {

      if (loading) {
        return null;
      }

      return <Typography>
        Нет ни одной публикации
      </Typography>
    }


    return super.render(<Grid
      container
      spacing={24}
    >

      <Grid
        item
        xs={12}
      >

        <div
          style={{
            marginTop: 20,
          }}
        >
          <AuthorizedAction
          >
            <Link
              to="/beer/create/"
            >
              Добавить пиво
            </Link>
          </AuthorizedAction>

        </div>

      </Grid>

      {beers.map(({ node: item }) => {

        let {
          id,
        } = item;


        return <Grid
          key={id}
          item
          xs={12}
          sm={6}
          md={3}
          lg={2}
          // xl={2}
          style={{
            // paddingLeft: 10,
            // paddingRight: 10,
            marginBottom: 20,
          }}
        >

          <BeerView
            beer={item}
          />

        </Grid>




      })}


    </Grid>);



  }

}

