import React, { Component } from 'react';
import './My404Component.css';
import { Container, Row, Col } from 'react-bootstrap';
import imgBrand from "../introSection/logo.svg";
import {FormattedMessage} from "react-intl";

class My404Component extends Component {
  render() {
    return (
      <div className="errorPage">
        <Container>
          <Row>
            <Col>
              <img className="logoError" src={imgBrand} alt="4Berry Logo"/>
            </Col>
            <Col>
              <h1 className="moreThanGreatFont"> 404 </h1>
              <div className="greatFont">
                <FormattedMessage id="page not found"/>
              </div>
              <div className="otherContent">
                <FormattedMessage id="ooops"/>
                <a href="/" className="chachan">
                  <FormattedMessage id="here"/>
                </a>
              </div>
              <div className="miniConStyle">
                <FormattedMessage id="att"/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default My404Component;
