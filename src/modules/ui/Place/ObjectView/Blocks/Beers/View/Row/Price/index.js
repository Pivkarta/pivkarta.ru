import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import Switch from 'material-ui/Switch';
import SaveIcon from 'material-ui-icons/Save';


export default class Price extends EditableView {

  static propTypes = {
    data: PropTypes.object.isRequired,
    inEditMode: PropTypes.bool.isRequired,
  }

  render() {

    const {
      inEditMode,
    } = this.props;

    const object = this.getObjectWithMutations();

    const {
      price,
    } = object;

    const isDirty = this.isDirty();

    return (
      inEditMode ? <form
        onSubmit={event => {
          event.preventDefault();
          this.save();
        }}
      >

        <TextField
          name="price"
          onChange={event => {
            const {
              value,
            } = event.target;

            this.updateObject({
              price: value && parseFloat(value) || null,
            });
          }}
          value={price || ""}
        />

        {isDirty ?
          <IconButton
            color="secondary"
            type="submit"
          >
            <SaveIcon
            />
          </IconButton>
          : null
        }

      </form>
        :
        price > 0 ? <span>{price} ₽</span> : ""
    )
  }
}
