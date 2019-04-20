import React, { Component } from 'react';
import './footerSection.css';
import {FaFacebook, FaGithub, FaInstagram} from "react-icons/fa/index";
import {Nav} from "react-bootstrap";
import {FormattedMessage} from 'react-intl';

class FooterSection extends Component {
  render() {
    return (
      <div className="Footer">
          <div className="row">
              <div className="col">
                  <span onClick = {this.props.manageScrollIntro}><FormattedMessage id="Home"/></span><br/><br/>
                  <span onClick = {this.props.manageScrollFeatures}><FormattedMessage id="Features"/></span><br/><br/>
                  <span onClick = {this.props.manageScrollAbout}><FormattedMessage id="About"/></span><br/>
              </div>
              <div className="col">
                  <span onClick={this.props.handleLoginFunction}><FormattedMessage id="Log in"/></span><br/><br/>
                  <span onClick={this.props.handleSignupFunction}><FormattedMessage id="Join"/></span><br/>
              </div>
              <div className="col">
                  <span onClick={this.props.handleLoginFunction}><FormattedMessage id="New"/></span><br/><br/>
                  <span onClick={this.props.handleLoginFunction}><FormattedMessage id="Open"/></span><br/>
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
