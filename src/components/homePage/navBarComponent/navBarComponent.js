import React, { Component } from 'react';
import './navBarComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Dropdown, Form } from "react-bootstrap";
import imgBrand from "./logo.svg";
import { Router } from 'react-router';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import {GiPerson, GiRamProfile} from "react-icons/gi";
import {FaRegUser} from "react-icons/fa/index";


class NavBarComponent extends Component {
    constructor(props) {
        super(props);

        this.cerrarSesion = this.cerrarSesion.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);

        if(this.props.user != undefined && this.props.user != null){
            this.state = {
                loggedIn: this.props.user.isLoggedIn
            };
        }
        else{
            this.state = {
                loggedIn: false
            };   
        }

    }

    cerrarSesion(event) {
        document.cookie = "empleador_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Router.push('/', )
        event.preventDefault();
    }

    iniciarSesion(event) {
        document.cookie = "empleador_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Router.push('/login')
        event.preventDefault();
    }
    render() {


        return (

            <Navbar className="Fixed-bar" bg="dark" expand="lg">
                    <Navbar.Brand href="#home" className="whiteFont">
                        <img alt="" src={imgBrand} width="70" height="70" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className="whiteFont" onClick = {this.props.manageScrollIntro}> <Link to="/" >Home </Link></Nav.Link>
                            <Nav.Link className="whiteFont"  onClick = {this.props.manageScrollFeatures}> <Link to="/"  onClick = {this.props.manageScrollFeatures}>Features </Link></Nav.Link>
                            <Nav.Link className="whiteFont"  onClick = {this.props.manageScrollAbout}> <Link to="/" > About </Link></Nav.Link>
                            { !this.state.loggedIn &&
                                <Nav.Link className="whiteFont" onClick={this.props.handleSignupFunction}>Join</Nav.Link>
                            }
                            { !this.state.loggedIn &&
                                <Nav.Link className="whiteFont" onClick={this.props.handleLoginFunction}>Log in</Nav.Link>
                            }
                        </Nav>
                        {
                            this.state.loggedIn &&
                            <Form inline>
                                <Dropdown>
                                    <Dropdown.Toggle className="whiteFont">
                                        <FaRegUser/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#" onClick={this.props.handleNew}> New </Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={this.props.handleLoad}> Open </Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={this.props.handleLogout}> Logout </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form>


                        }
                     </Navbar.Collapse>
                </Navbar>
        );
    }

}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user    
    };
}

const connectedNavBar = connect(mapStateToProps)(NavBarComponent);
export { connectedNavBar as NavBarComponent };

//export default NavBarComponent;