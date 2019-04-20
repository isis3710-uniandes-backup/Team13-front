import React, { Component } from 'react';
import './aboutSection.css';
import { Container, Row, Col, Image} from 'react-bootstrap';

class AboutSection extends Component {
  render() {
    return (
      <div className="About section" id="about">
        <div className="about-title"> About 4Berry</div>
        <div className="phrase-title"> Life started from a storyboard !</div>
              <Image className="imgSize" src="about.png" fluid />
      </div>
    );
  }
}

export default AboutSection;
