import React, {Component} from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IntroSection from '../introSection/introSection';
import FeaturesSection from "../featuresSection/featuresSection";
import AboutSection from "../aboutSection/aboutSection";
import FooterSection from "../footerSection/footerSection";
import {NavBarComponent} from "../navBarComponent/navBarComponent";
import {LoginComponent} from "../loginComponent/loginComponent";
import SignupComponent from "../signupComponent/signupComponent";


class Home extends Component {

    constructor(props)
    {
        super(props);
        this.state =
            {
                showLoginComponent: false,
                showSignUp: false
            };
        this.changeLoginView = this.changeLoginView.bind(this);
        this.changeJustLoginView = this.changeJustLoginView.bind(this);
        this.changeSignUpView= this.changeSignUpView.bind(this);
    }
    changeLoginView(event) {


        window.scrollTo(0, 0);

        this.setState({
            showLoginComponent: !this.state.showLoginComponent,
            showSignUp: !this.state.showSignUp
        });
        if(event) event.preventDefault();
    }

     scrollTo(id){
        document.getElementById(id).scrollIntoView();
    }

    changeJustLoginView(event) {

        
        window.scrollTo(0, 0);
        
        this.setState({
            showLoginComponent: !this.state.showLoginComponent,
            showSignUp: false
        });
        if(event) event.preventDefault();
    }
    changeSignUpView(event) {

        window.scrollTo(0, 0);

        this.setState({
            showLoginComponent: false,
            showSignUp: !this.state.showSignUp
        });
        if(event) event.preventDefault();
    }

    render() {

        return (
            <div className="Home">
                <IntroSection handleJoin={this.changeJustLoginView} />
                <LoginComponent showLogin={this.state.showLoginComponent} handleClose={this.changeJustLoginView} changeSignUp={this.changeSignUpView} />
                <SignupComponent showSignUp={this.state.showSignUp} handleClose={this.changeSignUpView} changeLogIn={this.changeLoginView}/>
                <FeaturesSection/>
                <AboutSection/>
                <FooterSection manageScrollIntro = { () => {document.getElementById('intro').scrollIntoView();}}
                               manageScrollFeatures= { () => {document.getElementById('features').scrollIntoView();}}
                               manageScrollAbout = { () => {document.getElementById('about').scrollIntoView();}}
                               handleLoginFunction={this.changeJustLoginView} handleSignupFunction = {this.changeSignUpView}/>
                <NavBarComponent manageScrollIntro = { () => {document.getElementById('intro').scrollIntoView();}} 
                manageScrollFeatures= { () => {document.getElementById('features').scrollIntoView();}}
                manageScrollAbout = { () => {document.getElementById('about').scrollIntoView();}} 
                handleLoginFunction={this.changeJustLoginView} handleSignupFunction = {this.changeSignUpView}
                loggedIn = {false} />
            </div>
        );
    }
}

export default Home;
