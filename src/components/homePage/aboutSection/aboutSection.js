import React, { Component } from 'react';
import './aboutSection.css';
import { Container, Row, Col, Image} from 'react-bootstrap';

class AboutSection extends Component {
  render() {
    return (
      <div className="About section" id="about">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Image class="imgSize" src="about.png" fluid />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AboutSection;
