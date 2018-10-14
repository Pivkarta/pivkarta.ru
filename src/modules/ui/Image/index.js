import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';

export const styles = {

};

export class ImageField extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }


  static defaultProps = {
    type: 'thumb',
  };

  render() {

    let {
      src,
      type,
      classes,
      alt,
      title,
      ...other
    } = this.props;

    if(!src || !type){
      return null;
    }

    src = `/images/resized/${type}/${src}`;

    return (
      <img 
        src={src}
        alt={alt}
        title={title}
        {...other}
      />
    )
  }
}

export default withStyles(styles)(ImageField);