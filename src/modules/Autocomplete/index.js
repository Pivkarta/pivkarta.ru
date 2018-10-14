

/**
 * Пока что используется старая версия, так как некогда перепроверять 
 * зависимости, но в дальнейшем надо будет перевести на fields/Autocomplete
 */


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Downshift from 'downshift';


function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(params) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
    ...other
  } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion.label;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...other}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(inputValue, suggestions) {
  let count = 0;

  return suggestions ? suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  }) : [];
}

const styles = {
  container: {
    flexGrow: 1,

    // Ограничивает по ширите не только элемент, но и выпадающий список
    // width: 200,

    maxHeight: 200,
    // '&.opened': {
    //   height: 200,
    // },
  },
};

function IntegrationDownshift(props) {
  const { classes } = props;

  let {
    suggestions,
    fullWidth,
    closeOnBlur,
    onNewRequest,
    onChange,
    onSelect,
    ...other
  } = props;



  return (
    <Downshift>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
          <div
            className={classes.container}
            style={{
              color: "red",
            }}
          >
            {renderInput({
              fullWidth,
              classes,
              InputProps: getInputProps({
                placeholder: 'Поиск',
                // id: 'integration-downshift',
                onChange,
              }),
              ...other
            })}
            {isOpen ? (
              <Paper square>
                {getSuggestions(inputValue, suggestions).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem,
                    onClick: event => {
                      return onSelect ? onSelect(event, suggestion) : false;
                    },
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
    </Downshift>
  );
}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);