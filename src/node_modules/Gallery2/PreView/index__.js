import React from 'react';

import PropTypes from "prop-types";

import Gallery from 'react-photo-gallery';

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

    previewPhotos.splice(0, 1);

    if (!previewPhotos.length) {
      return null;
    }


    let columns = 6;

    if ([2].indexOf(previewPhotos.length) !== -1) {
      columns = 2;
    }
    else if ([4].indexOf(previewPhotos.length) !== -1) {
      columns = 4;
    }
    else if ([1, 3, 6].indexOf(previewPhotos.length) !== -1) {
      columns = 3;
    }

    return (
      <div>
        <Gallery
          photos={previewPhotos} onClick={openLightbox}
          showThumbnails={true}
          columns={columns}
          {...other}
        />
      </div>
    )
  }
}

export default GalleryPreview;
