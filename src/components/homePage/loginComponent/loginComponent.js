import React, { Component } from 'react';
import './loginComponent.css';
import {FormGroup} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import {store} from '../../../_helpers/store';
import { Redirect } from 'react-router';
import { FaRegCheckCircle } from "react-icons/fa/index";
import {FormattedMessage} from 'react-intl';

class LoginComponent extends Component {

  constructor(props){
    super(props);

        this.state = {
            username: '',
            password: '',
            failedLogin: false,
            redirect: false,
            correctEmail: true
        };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isEmail = this.isEmail.bind(this);
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

      if(this.isEmail(email)) {
          this.setState( {
              correctEmail: true
          })
      } else {
          this.setState( {
              correctEmail: false
          })
      }

      this.setState({
        username: email,
        password: pass,
        failedLogin: this.state.failedLogin,
        redirect: this.state.redirect
      });
  }

  isEmail (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  render() {
      if (this.state.redirect) {
        return <Redirect push to="/main" />;
      }   
      if(this.props.showLogin){
          return (
              <div className="Login">
                  <Button type="button" className="close CloseButton" aria-label="Close modal" onClick={this.props.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </Button>
                  <h1 className="titleBerry">
                      <FormattedMessage id="Log in"/>
                      <hr/>
                  </h1>
                  <FormGroup controlId="formBasicEmail">
                      <label className="label1"><FormattedMessage id="Email"/></label>
                      <FormCheckInput aria-label="email" id = "email" className="pinky" type="email" placeholder="Email *" onChange={this.handleChange} /> <br/>
                  </FormGroup>
                  {
                      !this.state.correctEmail &&
                      <div className="supermini red">
                          <FormattedMessage id="incorrect email"/>
                          <br/>
                          <FormattedMessage id="EmailExample"/>
                      </div>
                  }
                  <br/>
                  <FormGroup controlId="formBasicPassword">
                      <label className="label2"><FormattedMessage id="Password"/></label>
                      <FormCheckInput aria-label="password" id = "pass" className="pinky" type="password" placeholder="Password *" onChange={this.handleChange} />
                  </FormGroup>
                  <br/>
                  <div className="supermini">
                      <FormattedMessage id="requiredf"/>
                  </div>
                  <div className="alignRight">
                      <Button aria-label= "submit" className="mainColor" type="submit" onClick={this.handleSubmit}>
                          <FaRegCheckCircle />
                      </Button>
                  </div>
                  <br/>
                  <div className="mini">
                      <FormattedMessage id="No account"/>
                      <div className="Green-link" onClick={this.props.changeSignUp}>
                       <FormattedMessage id="Sign up"/>
                      </div>
                      <FormattedMessage id="Free"/>
                  </div>
                  <br/>
                   { 
                    this.state.failedLogin &&
                    <Alert variant='danger'>
                      <FormattedMessage id="Incorrect"/>
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
    const { user } = state.authentication;

    return {
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginComponent);
export { connectedLoginPage as LoginComponent }; 

