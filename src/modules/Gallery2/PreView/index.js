import React from 'react';

import PropTypes from "prop-types";
import Grid from 'material-ui/Grid';

// import Gallery from 'react-photo-gallery';


class GalleryPreview extends React.Component {

  static propTypes = {
    photos: PropTypes.array.isRequired,
    openLightbox: PropTypes.func.isRequired,
  }

  render() {

    const {
      photos,
      openLightbox,
      ...other
    } = this.props;

    if (!photos || !photos.length) {
      return null;
    }

    let previewPhotos = photos.map(n => ({
      ...n,
      src: n.thumbnail ? n.thumbnail : n.src,
    }));

    // previewPhotos.splice(0, 1);

    if (!previewPhotos.length) {
      return null;
    }


    return (
      <Grid
        container
        spacing={8}
      >
        {previewPhotos.map((n, index) => {

          const {
            thumbnail,
            src,
            ...other
          } = n;

          return <Grid
            key={index}
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
          >
            <img
              style={{
                width: "100%",
                cursor: "pointer",
              }}
              src={thumbnail || src}
              onClick={event => openLightbox(event, ({index: index}))}
              {...other}
            />
          </Grid>
        })}
      </Grid>
    )
  }
}

export default GalleryPreview;
