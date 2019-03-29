import React, { Component } from 'react';
import './footerSection.css';
import {FaFacebook, FaGithub, FaInstagram} from "react-icons/fa/index";
import {Nav} from "react-bootstrap";

class FooterSection extends Component {
  render() {
    return (
      <div className="Footer">
          <div className="row">
              <div className="col">
                  <span onClick = {this.props.manageScrollIntro}>Home </span><br/><br/>
                  <span onClick = {this.props.manageScrollFeatures}>Features </span><br/><br/>
                  <span onClick = {this.props.manageScrollAbout}>About </span><br/>
              </div>
              <div className="col">
                  <span onClick={this.props.handleLoginFunction}>Login </span><br/><br/>
                  <span onClick={this.props.handleSignupFunction}>Sign up </span><br/>
              </div>
              <div className="col">
                  <span onClick={this.props.handleLoginFunction}>Create new Drawing </span><br/><br/>
                  <span onClick={this.props.handleLoginFunction}>Open project </span><br/>
              </div>
              <div className="col">
                  <div className="Footer-logo" alt="logo"/>
              </div>
          </div>
          <div className="moveAbs">
              4Berry © 2019
          </div>
          <div>
              <FaInstagram color="gray" className="socialIcons" onClick={() => { window.open('https://www.instagram.com/4berry', '_blank') }}/>
              <FaFacebook color="gray" className="socialIcons" onClick={() => { window.open('https://www.facebook.com/4berry', '_blank') }}/>
              <FaGithub color="gray" className="socialIcons" onClick={() => { window.open('https://www.github.com/4berry', '_blank') }}/>
          </div>
      </div>
    );
  }
}

export default FooterSection;
