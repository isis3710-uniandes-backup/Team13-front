import React, { Component } from 'react';
import './loginComponent.css';
import {FormGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import {store} from '../../../_helpers/store';
import { Redirect } from 'react-router';

class LoginComponent extends Component {

  constructor(props){
    super(props);

    this.props.dispatch(userActions.logout());


        this.state = {
            username: '',
            password: '',
            failedLogin: false,
            redirect: false
        };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    e.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password))

      if(store.getState().authentication.user !== undefined && store.getState().authentication.user.isLoggedIn){
        this.setState({
            username: '',
            password: '',
            failedLogin: true,
            redirect: true
        })
      }
      else {
       this.setState({
              username: '',
              password: '',
              failedLogin: true,
              redirect: false
        })
      }

    }


  }

   handleChange(e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const pass = document.getElementById("pass").value;

      this.setState({
        username: email,
        password: pass,
        failedLogin: this.state.failedLogin,
        redirect: this.state.redirect
      });
  }

  render() {
      if (this.state.redirect) {
        return <Redirect push to="/main" />;
      }   
      if(this.props.showLogin){
          return (
              <div className="Login">
                  <Button type="button" className="close CloseButton" aria-label="Close" onClick={this.props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </Button>
                  <h1 className="titleBerry">
                      Login
                      <hr/>
                  </h1>
                  <FormGroup controlId="formBasicEmail">
                      <FormCheckInput id = "email" className="pinky" type="email" placeholder="Enter email" onChange={this.handleChange} /> <br/>
                  </FormGroup>
                  <br/>
                  <FormGroup controlId="formBasicPassword">
                      <FormCheckInput id = "pass" className="pinky" type="password" placeholder="Password" onChange={this.handleChange} />
                  </FormGroup>
                  <br/>
                  <div className="alignRight">
                      <Button className="mainColor" type="submit" onClick={this.handleSubmit}>
                         <div className="mainColor">Login</div>
                      </Button>
                  </div>
                  <div>Don't have an account yet? <div className="Green-link" onClick={this.props.changeSignUp}>Sign up!</div> It's free!</div>
                  
                  <br/>
                   { 
                    this.state.failedLogin &&
                    <Alert variant='danger'>
                      Username or Password Incorrect
                    </Alert>
                  }
              </div>
          );
      } else {
          return (<div />)
      }

  }
}


function mapStateToProps(state) {
    console.log("mapStateToProps");
    const { user } = state.authentication;

    return {
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginComponent);
export { connectedLoginPage as LoginComponent }; 

