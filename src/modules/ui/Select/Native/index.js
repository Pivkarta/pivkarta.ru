import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import shortid from 'shortid';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelect extends React.Component {

  state = { 
    id: shortid.generate(),
  };

  
  render() {

    const { 
      classes,
      label,
      helperText,
      ...other
    } = this.props;

    const {
      id,
    } = this.state;

    return ( 
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          native
          inputProps={{
            id,
          }}
          {...other}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl> 
    );
  }
}

NativeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelect);