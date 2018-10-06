import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';

export const styles = {

};

export class ImageField extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }


  static defaultProps = {
    type: 'avatar',
  };

  render() {

    const {
      path,
      type,
      classes,
      alt,
      ...other
    } = this.props;

    if(!path || !type){
      return null;
    }

    const src = `/images/${type}/${path}`;

    return (
      <img 
        src={src}
        alt={alt}
        {...other}
      />
    )
  }
}

export default withStyles(styles)(ImageField);