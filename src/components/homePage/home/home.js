import React, { Component } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { IntroSection } from '../introSection/introSection';
import FeaturesSection from "../featuresSection/featuresSection";
import AboutSection from "../aboutSection/aboutSection";
import FooterSection from "../footerSection/footerSection";
import { NavBarComponent } from "../navBarComponent/navBarComponent";
import { LoginComponent } from "../loginComponent/loginComponent";
import SignupComponent from "../signupComponent/signupComponent";
import { userActions } from '../../../_actions/user.actions';
import { connect } from 'react-redux';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginComponent: false,
            showSignUp: false
        };
        this.changeLoginView = this.changeLoginView.bind(this);
        this.changeJustLoginView = this.changeJustLoginView.bind(this);
        this.changeSignUpView = this.changeSignUpView.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.reload1 = this.reload1.bind(this);
        this.reload2 = this.reload2.bind(this);

        if(navigator.onLine){
            if (this.props.user) {
                fetch("http://localhost:3001/api/users/isLogin", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'token': this.props.user.token })
                }).then((res) => {
                    return res.json()
                }).then((res) => {

                    if (!res.valid) {
                        console.log("IVnVALID HOME")
                        this.props.dispatch(userActions.logout());
                        this.reload1();
                        this.reload2();
                        console.log("STATE CH")
                    }
                })
            }

            console.log("HOME");
            console.log(this.props);
        }
    }
    reload1() {
        this.setState({
            showLoginComponent: false,
            showSignUp: false,
            reload: true
        });
    }

    reload2() {
        this.setState({
            showLoginComponent: false,
            showSignUp: false,
            reload: false
        });
    }

    changeLoginView(event) {


        window.scrollTo(0, 0);

        this.setState({
            showLoginComponent: !this.state.showLoginComponent,
            showSignUp: !this.state.showSignUp
        });
        if (event) event.preventDefault();
    }
    handleLogout(event) {
        this.props.dispatch(userActions.logout());
    }

    changeJustLoginView(event) {


        window.scrollTo(0, 0);

        this.setState({
            showLoginComponent: !this.state.showLoginComponent,
            showSignUp: false
        });
        if (event) event.preventDefault();
    }
    changeSignUpView(event) {

        window.scrollTo(0, 0);

        this.setState({
            showLoginComponent: false,
            showSignUp: !this.state.showSignUp
        });
        if (event) event.preventDefault();
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
                handleNew = {() => {console.log('todo');}}
                handleLoad = {() => console.log('todo')}
                handleLogout = {this.handleLogout}/>
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


const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };

//export default Home;
