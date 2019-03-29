import React, { Component } from 'react';
import './loggedHome.css';
import 'bootstrap/dist/css/bootstrap.css';
import IntroSection from '../introSection/introSection';
import FeaturesSection from "../featuresSection/featuresSection";
import AboutSection from "../aboutSection/aboutSection";
import FooterSection from "../footerSection/footerSection";
import NavBarComponent from "../navBarComponent/navBarComponent";
import LoginComponent from "../loginComponent/loginComponent";


class LoggedHome extends Component {
  render() {
    return (
      <div className="Home">
        {/*<NavBarComponent/>
        <IntroSection/>
        <LoginComponent/>
        <FeaturesSection/>
        <AboutSection/>
        <FooterSection/>*/}
      </div>
    );
  }
}

export default LoggedHome;
