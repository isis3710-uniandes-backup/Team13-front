import React, { Component } from 'react';
import './loginComponent.css';
import {FormGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Button from "react-bootstrap/Button";

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';

class LoginComponent extends Component {

  constructor(props){
    super(props);

    this.props.dispatch(userActions.logout());


        this.state = {
            username: '',
            password: ''
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
      dispatch(userActions.login(username, password));
    }
  }

   handleChange(e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const pass = document.getElementById("pass").value;

      this.setState({
        username: email,
        password: pass
      });
  }

  render() {
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
                          <Link to="/main" className="mainColor">Login</Link>
                      </Button>
                  </div>
                  <div>Don't have an account yet? <div className="Green-link" onClick={this.props.changeSignUp}>Sign up!</div> It's free!</div>
                  
                  <br/>
              </div>
          );
      } else {
          return (<div />)
      }

  }
}


function mapStateToProps(state) {

    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginComponent);
export { connectedLoginPage as LoginComponent }; 

