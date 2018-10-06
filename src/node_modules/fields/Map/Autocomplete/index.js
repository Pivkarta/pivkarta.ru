/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import CancelIcon from 'material-ui-icons/Cancel';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import SelectProto from 'react-select';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import 'react-select/dist/react-select.css';


/**
 * Deprecated !!!
 */

class Select extends SelectProto {

  renderInput(valueArray, focusedOptionIndex) {
    const className = classNames('Select-input', this.props.inputProps.className);
    const isOpen = this.state.isOpen;

    const ariaOwns = classNames({
      [`${this._instancePrefix}-list`]: isOpen,
      [`${this._instancePrefix}-backspace-remove-message`]: this.props.multi
        && !this.props.disabled
        && this.state.isFocused
        && !this.state.inputValue
    });

    let value = this.state.inputValue;
    if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
      // it hides input value when it is not focused and was not reset on select
      // value = '';
    }

    const inputProps = {
      ...this.props.inputProps,
      'aria-activedescendant': isOpen ? `${this._instancePrefix}-option-${focusedOptionIndex}` : `${this._instancePrefix}-value`,
      'aria-describedby': this.props['aria-describedby'],
      'aria-expanded': '' + isOpen,
      'aria-haspopup': '' + isOpen,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-owns': ariaOwns,
      className: className,
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      ref: ref => this.input = ref,
      role: 'combobox',
      required: this.state.required,
      tabIndex: this.props.tabIndex,
      value,
    };

    if (this.props.inputRenderer) {
      return this.props.inputRenderer(inputProps);
    }

    if (this.props.disabled || !this.props.searchable) {
      const { ...divProps } = this.props.inputProps;

      const ariaOwns = classNames({
        [`${this._instancePrefix}-list`]: isOpen,
      });
      return (

        <div
          {...divProps}
          aria-expanded={isOpen}
          aria-owns={ariaOwns}
          aria-activedescendant={isOpen ? `${this._instancePrefix}-option-${focusedOptionIndex}` : `${this._instancePrefix}-value`}
          aria-disabled={'' + this.props.disabled}
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
          className={className}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          ref={ref => this.input = ref}
          role="combobox"
          style={{ border: 0, width: 1, display: 'inline-block' }}
          tabIndex={this.props.tabIndex || 0}
        />
      );
    }

    if (this.props.autosize) {
      return (
        <AutosizeInput id={this.props.id} {...inputProps} minWidth="5" />
      );
    }
    return (
      <div className={className} key="input-wrap" style={{ display: 'inline-block' }}>
        <input id={this.props.id} {...inputProps} />
      </div>
    );
  }

}



const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
].map((suggestion, index) => ({
  value: index,
  label: suggestion.label,
}));

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
    multi: null,
    multiLabel: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      classes,
      onChange,
      style,
      // value,
      ...other
    } = this.props;

    const {
      // value,
    } = this.state;

    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.single}
          style={style}
          onChange={onChange}
          // onChange={this.handleChange('value')}
          placeholder="Search a country (start with a)"
          id="react-select-single"
          inputProps={{
            classes,
            name: 'react-select-single',
            instanceId: 'react-select-single',
            simpleValue: true,
            clearable: false,
            onBlurResetsInput: false,
            onSelectResetsInput: false,
            options: suggestions,
            inputRenderer: props => {



              return <div className='Select-input' key="input-wrap" style={{ display: 'inline-block' }}>
                <input
                  id={this.props.id}
                  // value={value || ""}
                  {...props}
                />
              </div>
            },
            ...other
          }}
        />
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationReactSelect);
