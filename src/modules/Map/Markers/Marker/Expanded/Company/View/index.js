import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import Image from 'src/modules/fields/Image';
// import Image from 'src/modules/fields/image';
import Image from 'src/modules/fields/image';
import CompanyLink from 'src/modules/ui/Link/Company';

import { withStyles } from 'material-ui/styles/';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = {
  root: {
    width: "220px",
    padding: "5px 5px 2px",
  },
  img: {
    width: "100%",
  },
}

export class ExpandedCompanyView extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {

    const {
      item,
      classes,
      className,
      ...other
    } = this.props;

    const {
      id,
      name,
      gallery,
    } = item;

    const image = gallery ? gallery[0] : null;

    return (
      <Paper
        className={[className, classes.root].join(" ")}
        {...other}
      >
        <CompanyLink
          id={id}
        >
          <Typography>
            {name}
          </Typography>
        </CompanyLink>

        {image ? <Image
          className={classes.img}
          path={image}
          type="action_cover"
        /> : null}
      </Paper>
    )
  }
}

export default withStyles(styles)(ExpandedCompanyView);