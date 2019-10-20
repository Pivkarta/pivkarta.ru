
/**
 * Ссылка на добавление объекта
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// import Grid from "material-ui/Grid";
// import IconButton from "material-ui/IconButton";
// import Button from "material-ui/Button";

import AddIcon from "material-ui-icons/Add";

import { Link } from "react-router-dom";
import withStyles from 'material-ui/styles/withStyles';


const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
  },
};

export class AddLink extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {

    const {
      to,
      classes,
      className,
      title,
      children,
      ...other
    } = this.props;

    if (!to) {
      return null;
    }

    return (
      <Link
        to={to}
        className={[className, classes.root].join(" ")}
        {...other}
      >
        {children ? children : <Fragment> <AddIcon /> {title || "добавить"} </Fragment>}
      </Link>
    )
  }
}

export default withStyles(styles)(AddLink);