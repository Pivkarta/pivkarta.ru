import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Snackbar from '../Snackbar';

export default class CustomComponent extends React.Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    loadApiData: PropTypes.func.isRequired,
    user: PropTypes.object,
  }


  state = {}


  addError(error){

    error = error || "Ошибка выполнения запроса";

    this.setState({
      error,
    }, () => {
      setTimeout(() => {

        // Проверка не очень надежная, так как строки не учитывают инстанс,
        // но это лучше, чем ничего.
        if(error === this.state.error){
          this.setState({
            error: null,
          });
        }

      }, 5000);
    });
  }

  
  query(params){

    return this.request("src/modules/query", params);

  }

  
  mutate(params){

    return this.request("mutate", params);

  }
  
  async request(method, params){

    this.setState({
      loading: true,
    });

    const {
      client,
    } = this.context;

    const result = await client[method](params)
    .catch(error => {
      // console.error(error);

      return error;
    });




    
    this.setState({
      loading: false,
    });


    let error;
    let errors;

    if(result instanceof Error){
      error = result.message;
      // throw(result);
    }
    else{
      const {
        // data: resultData,
        response,
      } = result.data || {};

      // const {
      //   response,
      // } = resultData || {};



      let {
        success,
        message,
        errors: responseErrors,
        ...other
      } = response || {};

      errors = responseErrors;

      if (success !== undefined) {

        // success = true;

        if (!success) {
  
          error = message || "Ошибка выполнения запроса";
  
          // errors && errors.map(error => {
          //   this.addError(error);
          // });
  

        }
      }


      
    }
    


    this.setState({
      errors,
    });

    if(error){
      this.addError(error);
      throw(result);
    }
    else{
      this.setState({
        error: null,
      });
    }

    return result;

  }
  
  reloadApiData(){

    const {
      loadApiData,
    } = this.context;

    return loadApiData();

  }


  renderField(field){

    if(!field){
      return null;
    }

    
    let {
      errors,
    } = this.state;
    
    const {
      type: Type,
      props: {
        name,
        helperText,
        onFocus,
      },
    } = field;
    



    const error = errors ? errors.find(n => n.key === name) : null;

    return <Type 
      {...field.props}
      error={error ? true : false}
      helperText={error && error.message ? error.message : helperText}
      onFocus={event => {

        if(errors && error){
          const index = errors.indexOf(error);
          errors.splice(index, 1);
          this.forceUpdate();
        }

        return onFocus ? onFocus(event) : null;
      }}
    />

  }


  render(content) {

    const {
      error,
    } = this.state;

    return (
      <Fragment>

        {content}


        <Snackbar
          opened={error ? true : false}
          message={error || ""}
          close={() => {
            this.setState({
              error: null,
            })
          }}
        />
        
      </Fragment>
    )
  }
}
