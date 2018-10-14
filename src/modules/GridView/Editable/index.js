
import React from 'react'

import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';
// import EditableView from 'apollo-cms/lib/DataView/Object/Editable';
import Typography from 'material-ui/Typography';

export default class AppEditableView extends EditableView{


  static contextTypes = {
    ...EditableView.contextTypes,
    setPageMeta: PropTypes.func.isRequired,
  };


  // setPageMeta() {

  //   const {
  //     setPageMeta,
  //   } = this.context;

  //   setPageMeta({
  //     title: this.getTitle(),
  //   });

  // }


  /**
   * Этот класс может использоваться для объектов в списках, поэтому
   * нельзя автоматом выставлять меты.
   * Там, где надо выставить, достаточно просто вернуть пустой объект
   */
  setPageMeta(meta) {


    
    if(!meta){
      return;
    }



    const {
      setPageMeta,
    } = this.context;

    return setPageMeta({
      title: this.getTitle(),
      ...meta,
    });

  }

  componentWillMount() {

    this.setPageMeta();

    super.componentWillMount && super.componentWillMount();
  }


  componentDidUpdate(prevProps, prevState) {

    this.setPageMeta();

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
  }


  renderHeader(){
    

    return <Typography
      variant="title"
      style={{
        marginBottom: 20,
      }}
    >
      {this.getTitle()}

      {this.getButtons()}

    </Typography>
  }


  renderField(field){

    const {
      errors,
    } = this.state;

    let {
      // key,
      type: Field,
      props,
      // ...other,
    } = field;

    const {
      key,
      name,
      helperText,
      onFocus,
      ...other
    } = props;

    const error = errors ? errors.find(n => n.key === name) : null;

    // return field;

    return <Field
      key={key}
      {...props}
      error={error ? true : false}
      helperText={error ? error.message : helperText}
      onFocus={event => {
        const {
          errors,
        } = this.state;

        if(errors){
          const index = errors.findIndex(({key}) => key === name);

          if(index !== -1){
            errors.splice(index, 1);
            this.setState({
              errors,
            });
          }
        }

        return onFocus ? onFocus(event) : false;

      }}
      onChange={event => this.onChange(event)}
    />;
  }


}