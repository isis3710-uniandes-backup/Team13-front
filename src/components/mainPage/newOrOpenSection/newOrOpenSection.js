import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './newOrOpenSection.css';
import {FormattedMessage} from 'react-intl';

class NewOrOpenSection extends Component {

	render() {
		if(this.props.show){
			return (
			<div>
				<Container>
					<Row className="Placeholder">
					</Row>
					<Row>
						<Col>
						</Col>
						<Col>
							<div className = "NewOrOpen no-padding">
								<Row className = "no-padding no-margin">
									<Col>
									<Button type="button" className="close CloseButton" aria-label="Close" onClick={this.props.handleClose}>
    	                				<span aria-hidden="true">&times;</span>
	                  				</Button>
	                  				</Col>
	                  			</Row>
	                  			<Container className="no-padding no-margin">
	                  				<Row className = "no-margin no-padding">
	                  					<Col className = "New no-margin" onClick = {this.props.handleNewStoryboard}>
	                  						<b className="intext-new"><FormattedMessage id="Create a new Storyboard"/></b>
	                  					</Col>
	                  					<Col className = "Open no-margin" onClick = {this.props.handleLoad}>
	                  					
	                  						<b className="intext-load"><FormattedMessage id="Open an existing storyboard"/></b>
	                  					</Col>
	                  				</Row>
	                  			</Container>
							</div>
						</Col>
						<Col>
						</Col>
					</Row>
				</Container>
			</div>
			);
		}
		else {
			return <div></div>
		}
	}
}

export default NewOrOpenSection;
