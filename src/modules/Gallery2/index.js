import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


// import Gallery from 'react-cms/src/app/components/Gallery/Editor';
// import Gallery from 'Gallery/Editor';
import { Editor as GalleryEditor } from '../Gallery';
// import Slider from 'Gallery/Slider';


import Lightbox from 'react-images';

import GalleryPreview from "./PreView";

export default class CompanyGalleryBlock extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    updateObject: PropTypes.func,
    inEditMode: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
  }

  state = {
    currentImage: 0,
    lightboxIsOpen: false,
  }

  openLightbox = (event, obj) => {



    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });

  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }



  render() {

    let {
      item,
      updateObject,
      inEditMode,
      renderer,
      ...other
    } = this.props;


    const {
      lightboxIsOpen,
      currentImage,
    } = this.state;


    item = Object.assign({ ...item }, {
      // gallery: [{},{}],
    });

    if (inEditMode) {
      return (
        <GalleryEditor
          item={item}
          classes={{}}
          onUpload={({ data }, b, c) => {



            const {
              multipleUpload,
            } = data || {}

            if (multipleUpload) {

              let {
                gallery,
              } = item;

              gallery = gallery && gallery.map(n => n) || [];

              multipleUpload.map(n => {

                const {
                  path,
                } = n;

                if (path) {
                  gallery.push(path);
                }

              });

              updateObject({
                gallery,
              });

            }

          }}
          updateItem={(item, data) => {



            updateObject(data);

            // this.updateItem(data);
          }}
          {...other}
        />
      )
    }
    else {

      const {
        gallery,
        name,
      } = item;

      if (!gallery || !gallery.length) {
        return null;
      }
      else {

        const photos = gallery.map(src => ({
          thumbnail: `/images/slider_thumb/${src}`,
          src: `/images/big/${src}`,
          alt: name,
          title: name,
          caption: name,
        }));


        let content = <Fragment>

          <GalleryPreview
            photos={photos}
            openLightbox={this.openLightbox}
          />

          <Lightbox
            images={photos}
            isOpen={lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
            currentImage={currentImage}
          />

        </Fragment>;

        return renderer ? renderer(content) : content;
      }
    }
  }
}
