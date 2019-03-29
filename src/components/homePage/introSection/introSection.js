import React, { Component } from 'react';
import './introSection.css';
import imgBrand from "./logo.svg";
import Button from "react-bootstrap/es/Button";

class IntroSection extends Component {

  render() {

    return (
      <div className="Intro section" id="intro" onClick={this.props.onClick}>
          <div className="transformText">4Berry</div>
        <img className="Intro-logo" src={imgBrand} alt="logo"/>
        <div className="pushCenter">
            <div className="mainBerry">
                4Berry
            </div>
            <h4 className="subtitleBerry">
                Life started from a storyboard !
            </h4>
            <Button className="mainButton" onClick={this.props.handleJoin}>Join now !</Button>
        </div>
        <div id="wave"></div>
      </div>
    );
  }

}

export default IntroSection;
