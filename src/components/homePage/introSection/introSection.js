import React, { Component } from 'react';
import './introSection.css';
import imgBrand from "./logo.svg";
import Button from "react-bootstrap/es/Button";
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';


class IntroSection extends Component {

  constructor(props){
    super(props);

    if(this.props.user != undefined && this.props.user != null){
            this.state = {
                loggedIn: this.props.user.isLoggedIn
      };
    }
    else{
      this.state = {
        loggedIn: false
      }
    }
  }

  render() {

    return (
      <div className="Intro section" id="intro" onClick={this.props.onClick}>
          <div className="transformText">4Berry</div>
        <img className="Intro-logo" src={imgBrand} alt="4Berry Logo"/>
        <div className="pushCenter">
            <div className="mainBerry">
                <h1>4Berry</h1>
            </div>
            <h2 className="subtitleBerry">
                Life started from a storyboard !
            </h2>
            { !this.state.loggedIn &&
              <Button className="mainButton" onClick={this.props.handleJoin}>Join now !</Button>
            }
            {
              this.state.loggedIn &&
              <Button className="mainButton">
                <Link to = "/main"> Start Playing </Link>
              </Button>
            }

        </div>
        <div id="wave"></div>
      </div>
    );
  }

}

function mapStateToProps(state) {

    const { user } = state.authentication;

    return {
        user
    };
}


const connectedIntro = connect(mapStateToProps)(IntroSection);
export { connectedIntro as IntroSection };

//export default IntroSection;
