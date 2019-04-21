import React, { Component } from 'react';
import './signupComponent.css';
import {FormGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FaRegCheckCircle } from "react-icons/fa/index";
import {FormattedMessage} from 'react-intl';


class SignupComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      signUpOk: false,
      signUpError: false,
      username: '',
      password: '',
        correctEmail: true,
        correctPassword: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.checkSignUp = this.checkSignUp.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.isPassword = this.isPassword.bind(this);
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


    handleChangePassword(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

      if(this.isPassword(pass)) {
          this.setState( {
              correctPassword: true
          })
      } else {
          this.setState( {
              correctPassword: false
          })
      }

      this.checkSignUp(email, pass)
  }
  handleChangeEmail(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

      if(this.isEmail(email)) {
          this.setState( {
              correctEmail: true
          })
      } else {
          this.setState( {
              correctEmail: false
          })
      }

    this.checkSignUp(email, pass)
  }
  checkSignUp(email, pass) {
      this.setState({
          'signUpOk': this.state.signUpOk,
          'signUpError': this.state.signUpError,
          username: email,
          password: pass
      });
  }

    isEmail (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    isPassword (text) {
        let passw =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return text.match(passw)
    }

  render() {
      if(this.props.showSignUp){
          return (
              <div className="Login">
                  <Button type="button" className="close CloseButton" aria-label="Close" onClick={this.props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </Button>
                  <h1 className="titleBerry">
                      <FormattedMessage id="Join"/>
                      <hr/>
                  </h1>
                  <FormGroup controlId="formBasicEmail">
                      <FormCheckInput aria-label="email" id = "email" onChange={this.handleChangeEmail} className="pinky" type="email" placeholder="Enter email *" /> <br/>
                  </FormGroup>
                  {
                      !this.state.correctEmail &&
                      <div className="supermini red">Incorrect email. You have to include @ and .something </div>
                  }
                  <br/>
                  <FormGroup controlId="formBasicPassword">
                      <FormCheckInput aria-label="password" id = "pass" onChange={this.handleChangePassword} className="pinky" type="password" placeholder="Password *" />
                  </FormGroup>
                  {
                      !this.state.correctPassword &&
                          <div className="supermini red thepadding">Incorrect password. It must be 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase.</div>
                  }
                  {
                      !this.state.correctPassword &&
                      <div className="supermini">
                          <FormattedMessage id="requiredf"/>
                      </div>
                  }
                  {
                      this.state.correctPassword &&
                      <div className="supermini thepadding">
                          <FormattedMessage id="requiredf"/>
                      </div>
                  }
                  <br/>
                  <div className="alignRight">
                      <Button aria-label= "submit" id="mainColor" type="submit" onClick={this.handleSubmit}>
                          <FaRegCheckCircle />
                      </Button>
                  </div>
                  <br/>
                  <div className="mini"><FormattedMessage id="yes account"/><div className="Green-link" onClick={this.props.changeLogIn}><FormattedMessage id="Log in"/></div></div>
                  { 
                    this.state.signUpError &&
                    <Alert variant='danger'>
                    <FormattedMessage id="already use"/>
                    </Alert>
                  }
                  { 
                    this.state.signUpOk &&
                    <Alert variant='success'>
                    <FormattedMessage id="User registered"/>
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
