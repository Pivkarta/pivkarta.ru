import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// import Pagination from '../../../Pagination';

import TableView from '../../../GridView/Table';

import AuthorizedAction from 'src/modules/authorized-action';

import Bitter from "src/modules/ui/Bitter";

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

        // if (!image) {
        //   return null;
        // }

        // image = image ? `/images/avatar/uploads/${image}` : "";
        image = image ? `/images/resized/place_avatar/${image}` : "";

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
          <Link
            to={url}
            href={url}
            title={name}
            style={{
              display: "flex",
              height: "100%",
              // border: "1px solid",
              flexDirection: "column",
              flexBasis: "100%",
            }}
            className="barblock__card"
          >
            <img
              src={image}
              alt={name}
              title={name}
              width="100%"
            />
            <div className="barblock__nameblock">
              <div className="barblock__name">
                {name}
              </div>
              <div className="barblock__address">
                {color
                  ?
                  <div>
                    <i className="fas fa-palette"></i> {color}
                  </div>
                  :
                  null
                }

                {bitter
                  ?
                  <div>
                    <i className="fab fa-hotjar"></i> <Bitter
                      bitter={bitter}
                    />
                  </div>
                  :
                  null
                }

              </div>
            </div>
            <div className="barblock__type">
              <span className="barblock__type__active">
                {manufacturer}
              </span>
            </div>

          </Link>
        </Grid>


        return <Grid
          key={id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{
            // paddingLeft: 10,
            // paddingRight: 10,
            marginBottom: 20,
          }}
        >
          <Link
            to={url}
            href={url}
            title={name}
            style={{
              display: "flex",
              height: "100%",
              // border: "1px solid",
              flexDirection: "column",
              flexBasis: "100%",
            }}
          >
            <Typography
              variant="title"
              style={{
                flexGrow: 1,
                marginBottom: 3,
              }}
            >
              {name}
            </Typography>

            <img
              src={image}
              style={{
                width: "100%",
              }}
            />

          </Link>
        </Grid>

      })}

      {/* {beers ? <Grid
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



    // return beers.map(({node}) => {

    //   const {
    //     id,
    //   } = node;

    //   return null

    // });
  }

}
