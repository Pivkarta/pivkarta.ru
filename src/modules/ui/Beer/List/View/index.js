import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Bitter from "src/modules/ui/Bitter";

import { Link } from 'react-router-dom';

class BeerView extends Component {

  static propTypes = {
    beer: PropTypes.object.isRequired,
  };

  render() {

    const {
      beer: item,
    } = this.props;


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
      container_str,
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

    return (
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

            {container_str
              ?
              <div>
                <i className="fas fa-beer"></i> {container_str}
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
    );
  }
}


export default BeerView;