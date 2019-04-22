import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './newOrOpenSection.css';
import {FormattedMessage} from 'react-intl';
import {Breadcrumb} from 'react-bootstrap';

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

							<Breadcrumb>
								<Breadcrumb.Item onClick={this.props.handleClose}>Gamemode</Breadcrumb.Item>
								<Breadcrumb.Item active>
									Storyboard
								</Breadcrumb.Item>
							</Breadcrumb>
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

	                  						<h1 className="intext-new"><FormattedMessage id="Create a new Storyboard"/></h1>
	                  						<Button aria-label= "Create a new Storyboard" className = "btnSelect dist" type="button" variant="secondary">
	                  							<FormattedMessage id="Create"/>
	                  						</Button>
	                  					</Col>
	                  					<Col className = "Open no-margin" onClick = {this.props.handleLoad}>
	                  					
	                  						<h1 className="intext-load"><FormattedMessage id="Open an existing storyboard"/></h1>
	                  						<Button aria-label= "Open an existing Storyboard" className = "btnSelect dist" type="button" variant="secondary">
	                  							<FormattedMessage id="Open"/>
	                  						</Button>
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
