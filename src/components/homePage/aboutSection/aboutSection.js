import React, { Component } from 'react';
import './aboutSection.css';
import { Container, Row, Col, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

class AboutSection extends Component {
  render() {
    return (
      <div className="About section" id="about">
        <Container>
          <Row>
            <h1 className="AxeH2"><FormattedMessage id="About 4Berry"/></h1>
          </Row>
          <br/>
          <br/>
          <Row>
            <h2 className="AxeH2"><FormattedMessage id="Made By"/></h2>
          </Row>
          <br/>
          <Row>
            <h2 className="AxeH2">Ana Fandiño</h2>
          </Row>
          <Row>
            <h2 className="AxeH2">Felipe Velásquez</h2>
          </Row>
          <Row>
            <h2 className="AxeH2">Santiago Múnera</h2>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AboutSection;
