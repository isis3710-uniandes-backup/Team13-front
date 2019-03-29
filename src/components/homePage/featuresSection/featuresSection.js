import React, { Component } from 'react';
import './featuresSection.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {FaPen, FaPalette, FaRegNewspaper} from 'react-icons/fa';

class FeaturesSection extends Component {
  render() {
    return (
      <div className="Feature section" id="features">
		<Container>
      		<div className="Spacer">
      		</div>
      		<Row>
      			<Col>
      			</Col>
      			<Col>
      				<div className = "Feature-cont">
      					<div className = "Feature1 Feature-core">
      						<FaRegNewspaper className="Icon"/>
      					</div>
      					<b>Create Storyboards</b>
      				</div>
      			</Col>
      			<Col>
      			</Col>
      			<Col>
      				<div className = "Feature-cont">
      					<div className = "Feature2 Feature-core">
      						<FaPen className="Icon"/>
      					</div>
      					<b>Write your stories</b>
      				</div>
      			</Col>
      			<Col>
      			</Col>
      		</Row>
      		<Row>
      			<Col>
      			</Col>
      			<Col>
      			</Col>
      			<Col>
      				<div className = "Feature-cont">
      					<div className = "Feature3 Feature-core">
      						<FaPalette className="Icon"/>
      					</div>
      					<b>Create pixel art drawings</b>
      				</div>
      			</Col>
      			<Col>
      			</Col>
      			<Col>
      			</Col>
      		</Row>
      	</Container>
      </div>
    );
  }
}

export default FeaturesSection;
