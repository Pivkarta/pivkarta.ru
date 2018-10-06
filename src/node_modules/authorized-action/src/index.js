
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import AuthModal from '../../../components/UserMenu/AuthModal';

export default class AuthorizedAction extends Component {

  static propTypes = {
    onError: PropTypes.func,
    children: PropTypes.object.isRequired,
  }
  
  static contextTypes = {
    openLoginForm: PropTypes.func.isRequired,
    user: PropTypes.object,
  };


  state = {
  }

  render() {

    const {
      children,
      onError,
      ...other
    } = this.props;
    
    
    const {
      user,
    } = this.context;

    if(!children){
      return null;
    }

    const {
    } = this.state;


    const {
      type: Type,
      props,
    } = children;


    const {
      onClick,
    } = props;

    return (
      <Fragment>
      <Type
        {...props}
        onClick={event => {
          
          if(!user){
            event.preventDefault();
            event.stopPropagation();

            const {
              openLoginForm,
            } = this.context;

            openLoginForm();
            
            return onError ? onError(event) : false;
          }

          // else
          return onClick ? onClick(event) : null;
        }}
      />

      </Fragment>
    )
  }
}
