import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    '& input': {
      boxSizing: "content-box",
    }
  },
});

class AppTextField extends Component {

  render() {
    
    const { 
      classes,
      ...other
    } = this.props;

    return <TextField
      className={classes.textField}
      // margin="normal"
      inputProps={{
        className: classes.input
      }}
      {...other}
    />;
  }
}

AppTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTextField);
