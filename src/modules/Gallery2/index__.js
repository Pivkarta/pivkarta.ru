import React, { Component } from 'react'
import PropTypes from 'prop-types'


// import Gallery from 'react-cms/src/app/components/Gallery/Editor';
// import Gallery from 'Gallery/Editor';
import {Editor as GalleryEditor} from 'Gallery';
import Slider from 'Gallery/Slider';

export default class CompanyGalleryBlock extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    updateObject: PropTypes.func,
    inEditMode: PropTypes.bool.isRequired,
  }

  render() {

    let {
      item,
      updateObject,
      inEditMode,
      ...other
    } = this.props;


    
    item = Object.assign({...item}, {
      // gallery: [{},{}],
    });
    
    if(inEditMode){
      return (
        <GalleryEditor 
        item={item}
        classes={{}}
        onUpload={({data},b,c) => {
          

          
          const {
            multipleUpload,
          } = data || {}
          
            if(multipleUpload){
              
              let {
                gallery,
              } = item;

              gallery = gallery && gallery.map(n => n) || [];

              multipleUpload.map(n => {

                const {
                  path,
                } = n;

                if(path){
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
    else{

      const {
        gallery,
      } = item;

      if(!gallery || !gallery.length){
        return null;
      }
      else{

        return <Slider
          gallery={gallery}
        />
        
      }
    }
  }
}
