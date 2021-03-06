import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Image from 'src/modules/fields/image';

import { withStyles } from 'material-ui/styles/';
import Grid from 'material-ui/Grid';

import Typography from 'material-ui/Typography';

import CompanyLink from 'src/modules/ui/Link/Company';
import Editor from 'src/modules/fields/Editor';

import {Link} from 'react-router-dom';

const styles = {
  image: {
    // maxWidth: "100%",
    width: "100%",
  },
  title: {
    color: "#116f9c",
    fontSize: "1rem",
  },
  subtitle: {
    color: "#989191",
    fontSize: "0.8rem",
  },
  mainLink: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  comment: {
    maxHeight: 142,
    overflow: "hidden",
  },
}


export class SideBarCompanyView extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {

    const {
      item,
      classes,
    } = this.props;

    const {
      id,
      name,
      gallery,
      logo,
      comment,
    } = item;

    let inEditMode = false;


    const image = gallery ? gallery[0] : null;

    if (!image) {
      return null;
    }

    const {
      router: {
        history,
        route,
      },
    } = this.context;

    const {
      match: {
        params: {
          lat,
          lng,
          zoom,
          query,
        },
      },
    } = route;


    let paths = [""];

    if(lat && lng && zoom){
      paths.push(`@${lat},${lng},${zoom}`);
    }

    if(query){
      paths.push("search");
      paths.push(query);
    }
    
    paths.push("company");
    paths.push(id);


    const url = paths.join("/");

    // return <Link
    //   to="/@55.75289799999999,37.62190800000002,11/search/fit/companies/SyfNJSajM_z/"
    // >
    //   dddddddd
    // </Link>

    return (
      <Grid
        item
        xs={12}
        md={6}
      >
        <Link
          id={id}
          className={classes.mainLink}
          // to="/@55.75289799999999,37.62190800000002,11/search/fit/companies/SyfNJSajM_z/"
          to={url}
        >

          {image ? <Image
            path={image}
            type="action_cover"
            className={classes.image}
          /> : null}


          <Grid
            container
            spacing={0}
          >

            <Grid
              item
              xs
              style={{
                overflow: "hidden",
              }}
            >

              <Typography
                variant="subheading"
                className={classes.title}
              >
                {name}
              </Typography>

              <Typography
                className={classes.subtitle}
              >
                Заведение
              </Typography>

            </Grid>

            {logo ? <Grid
              item
            >
              <Image
                path={logo}
                type="logo"
              // className={classes.image}
              />
            </Grid>
              : null
            }

          </Grid>

          {comment ?
            <div
              className={classes.comment}
            >
              <Editor
                value={comment}
                readOnly={!inEditMode}
              />
            </div>
            :
            null
          }


        </Link>


      </Grid>
    )
  }
}

export default withStyles(styles)(SideBarCompanyView);