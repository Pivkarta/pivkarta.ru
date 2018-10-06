
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Modal from 'Modal';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'ui/TextField';


import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';


import {
  signin,
  signup,
} from 'query';


import CustomComponent from "Component";


export default class AuthModal extends CustomComponent {


  static contextTypes = {
    ...CustomComponent.contextTypes,
    onAuthSuccess: PropTypes.func.isRequired,
  };

  
  constructor(props){

    super(props);

    
    this.state = this.getInitialState();
    
  }
  
  
  getInitialState(){

    const {
      username = "",
      // firstname,
      // middlename,
      // lastname,
      email = "",
      password = "",
    } = this.props;

    return Object.assign(this.state || {}, {
      stage: "login",
      // stage: "signup",
      username,
      // firstname,
      // middlename,
      // lastname,
      email,
      password,
    });

  }


  login = async (event) => {

    event.preventDefault();

    // const {
    //   signin: loginHandler,
    // } = this.props;

    // console.log("login this", this);

    const {
      username,
      password,
    } = this.state;


    let result = await this.mutate({
      mutation: signin,
      variables: {
        username: username || "",
        password: password || "",
      },
    })
    .then(result => {

      // console.log("login result 2", result);

      const {
        response,
      } = result && result.data || {}
  
      
      this.onSuccess(response);

      return result;

    })
    // .catch(e => {

    //   console.error('login error', e);

    //   alert(e.message);

    //   return e;

    // });



  }


  async signup(event){

    event.preventDefault();



    const {
      username = "",
      firstname = "",
      middlename = "",
      lastname = "",
      email = "",
      password = "",
    } = this.state;


    let result = await this.mutate({
      mutation: signup,
      variables: {
        username,
        firstname,
        middlename,
        lastname,
        email,
        password,
      },
    })
    // .then(r => {

    //   console.log("signup result", r);

    //   return r;

    // })
    // .catch(e => {

    //   console.error('', e);

    //   return e;

    // });

    const {
      response,
    } = result && result.data || {}
    

    // console.log("signup result signup", result.data);

    this.onSuccess(response);

  }


  // async request(operation, options){

  //   this.setState({
  //     errors: null,
  //   });


  //   // let errors;


  //   let result = await operation(options)
  //   .then(r => {

  //     console.log("request result", r);

  //     return r;
  //   })
  //   .catch((e,a,b) => {
  //     console.error('request error', e);

  //     // errors = e.errors;
  //     throw(e);
  //     // return e;
  //   });

    
  //   const {
  //     errors,
  //   } = result || {};


  //   errors && this.setState({
  //     errors,
  //   });

  //   return result;

  // }


  onSuccess(response){

    const {
      onAuthSuccess,
    } = this.context;


    const {
      success,
      token,
      data: user,
    } = response;

    if(success && token){

      onAuthSuccess({
        token,
        user,
      });
  
      this.setState(this.getInitialState(), () => this.close());
      
    }

  }


  onChange = (event) => {

    let {
      name,
      value,
    } = event.target;

    // switch(name){

    //   case 'em':
        
    //     name = 'email';

    //     break;

    // }

    this.setState({
      [name]: value,
    });

  }


  close(){

    const {
      onClose,
    } = this.props;

    return onClose();

  }


  render(){


    const {
      login,
      signup,
      ...other
    } = this.props;


    const {
      stage,
      username,
      firstname,
      middlename,
      lastname,
      email,
      password,
      errors,
    } = this.state;


    let form;


    // let firstnameInput = <TextField
    //   key="firstname"
    //   label="First name"
    //   name="firstname"
    //   value={firstname || ""}
    //   type="text"
    //   onChange={this.onChange}
    // />

    // let lastnameInput = <TextField
    //   key="lastname"
    //   label="Last name"
    //   name="lastname"
    //   value={lastname || ""}
    //   type="text"
    //   onChange={this.onChange}
    // />

    let usernameInput = this.renderField(<TextField
      key="username"
      label="Логин *"
      name="username"
      value={username || ""}
      type="text"
      onChange={this.onChange}
    />);
      
    let emailInput = this.renderField(<TextField
      key="email"
      label="Email"
      name="email"
      type="text"
      value={email || ""}
      onChange={this.onChange}
    />)
      
      
    let passwordInput = this.renderField(<TextField
      key="password"
      label="Пароль *"
      type="password"
      name="password"
      value={password || ""}
      onChange={this.onChange}
    />)

    switch(stage){

      case 'login':

        form = <form
          onSubmit={event => this.login(event)}
        >

          <div
            style={{
              marginTop: 10,
              marginBottom: 15,
            }}
          >

            {usernameInput}

          </div>


          <div
            style={{
              marginTop: 10,
              marginBottom: 15,
            }}
          >

            {passwordInput}

          </div>

          <Button
            type="submit"
            raised
            color="accent"
          >
            Авторизоваться
          </Button>

        </form>

        break;

      
      case 'signup':
  
          form = <form
            onSubmit={event => this.signup(event)}
          >

            {/* <div
              style={{
                marginTop: 10,
                marginBottom: 15,
              }}
            >
            
              {firstnameInput}

            </div>

            <div
              style={{
                marginTop: 10,
                marginBottom: 15,
              }}
            >
            
              {lastnameInput}

            </div> */}

            <div
              style={{
                marginTop: 10,
                marginBottom: 15,
              }}
            >
            
              {usernameInput}

            </div>

            <div
              style={{
                marginTop: 10,
                marginBottom:15,
              }}
            >

              {emailInput}

            </div>

            <div
              style={{
                marginTop: 10,
                marginBottom: 15,
              }}
            >

              {passwordInput}

            </div>
            

            <Button
              type="submit"
              raised
              color="accent"
            >
              Зарегистрироваться
            </Button>
            
  
          </form>
  
          break;

    }


    return super.render(<Modal
      {...other}
    >
      
      <div>

        <Grid
          container
        >

          <Grid
            item
            xs={6}
          >

            <Button
              // disabled={stage === "login"}
              color={stage === "login" ? "primary" : "default"}
              onClick={event => this.setState({
                stage: "login"
              })}
            >
              Вход
            </Button>

          </Grid>

          <Grid
            item
            xs={6}
          >

            <Button
              // disabled={stage === "signup"}
              color={stage === "signup" ? "primary" : "default"}
              onClick={event => this.setState({
                stage: "signup"
              })}
            >
              Регистрация
            </Button>

          </Grid>

        </Grid>

        {form}

        {errors && errors.map((n, index) => {

          const {
            key,
            message,
          } = n || {};
          
          if(this.state[key] !== undefined){
            return;
          }

          if(!message){
            return;
          }

          return <p
            key={index}
            style={{
              color: "red",
            }}
          >
            {message}
          </p>

        })}

      </div>

    </Modal>)
  }

}


// const userfields = `
//   id
//   username
//   email
//   firstname
//   middlename
//   lastname
// `;


// const LOGIN = gql`
//   mutation signin(
//     $username: String!
//     $password: String!
//   ){
//     signin(
//       username: $email
//       password: $password
//     ){
//       token
//       user{
//         ${userfields}
//       }
//     }
//   }
// `;

// const SIGNUP = gql`
//   mutation signup(
//     $username: String!
//     $firstname: String!
//     $lastname: String!
//     $middlename: String
//     $email: String!
//     $password: String!
//   ){
//     signup(
//       username: $username
//       firstname: $firstname
//       lastname: $lastname
//       middlename: $middlename
//       email: $email
//       password: $password
//     ){
//       token
//       user{
//         ${userfields}
//       }
//     }
//   }
// `;


// export default compose(
//   graphql(signin, {
//     name: 'signin', // name of the injected prop: this.props.createDraftMutation...
//     // data: (a,b) => {
//     //   console.error("onError",a,b);
//     // },
//     options: {
//       errorPolicy: 'all'
//     },
//   }),
//   graphql(signup, {
//     name: 'signup', // name of the injected prop: this.props.createDraftMutation...
//     options: {
//       errorPolicy: 'all'
//     },
//   }),

// )(AuthModal);
