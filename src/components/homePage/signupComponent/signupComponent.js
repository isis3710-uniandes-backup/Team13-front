import React, { Component } from 'react';
import './signupComponent.css';
import {FormGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FaRegCheckCircle } from "react-icons/fa/index";


class SignupComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      'signUpOk': false,
      'signUpError': false,
      'username': '',
      'password': ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    e.preventDefault();

    const { username, password } = this.state;


    console.log(this.state)


    if (username && password) {
      //Hacer petición al backend.
      //Si se puede este estado.
      this.setState({
        'signUpOk': true,
        'signUpError': false,
        'username': this.state.username,
        'password': this.state.password
      });

      //Si hay error, este otro:
      /*this.setState({
        'signUpOk': false,
        'signUpError': true,
        'username': this.state.username,
        'password': this.state.password
      })*/
    }
    else{
      //Si hay error, este otro:
      this.setState({
        'signUpOk': false,
        'signUpError': true,
        'username': this.state.username,
        'password': this.state.password
      });
    }


    return true;
  }


  handleChange(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    this.setState({

      'signUpOk': this.state.signUpOk,
      'signUpError': this.state.signUpError,
      username: email,
      password: pass
    });

    console.log(this.state);
  }

  render() {
      if(this.props.showSignUp){
          return (
              <div className="Login">
                  <Button type="button" className="close CloseButton" aria-label="Close" onClick={this.props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </Button>
                  <h1 className="titleBerry">
                      Sign up
                      <hr/>
                  </h1>
                  <FormGroup controlId="formBasicEmail">
                      <FormCheckInput id = "email" onChange={this.handleChange} className="pinky" type="email" placeholder="Enter email" /> <br/>
                  </FormGroup>
                  <br/>
                  <FormGroup controlId="formBasicPassword">
                      <FormCheckInput id = "pass" onChange={this.handleChange} className="pinky" type="password" placeholder="Password" />
                  </FormGroup>
                  <br/>
                  <div className="alignRight">
                      <Button id="mainColor" type="submit" onClick={this.handleSubmit}>
                          <FaRegCheckCircle />
                      </Button>
                  </div>
                  <br/>
                  <div className="mini">Already have an account? <div className="Green-link" onClick={this.props.changeLogIn}>Log in!</div> It's free !</div>
                  { 
                    this.state.signUpError &&
                    <Alert variant='danger'>
                      Email Already in Use
                    </Alert>
                  }
                  { 
                    this.state.signUpOk &&
                    <Alert variant='success'>
                      User registered. Please login now.
                    </Alert>
                  }
              </div>
          );
      } else {
          return (<div />)
      }

  }
}

export default SignupComponent;
