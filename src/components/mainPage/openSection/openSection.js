import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './openSection.css';

class OpenSection extends Component {

	constructor(props){

		super(props);

    	this.state = {
    		files: [
    			{
    				title: 'The First Storyboard!',
    				id: 0
    			}
    		]
    	};
    }

	render() {

		const getFiles = this.state.files.map(f => {
			return (
				<Col xs = {4}>
					<Container>
						<Col xs = {1}>
						</Col>
						<Col xs={10} className = "titleCol" onClick={this.props.handleSelected}>
							<p className="filename">{f.title}</p>
						 </Col>
						 <Col xs = {1}>
						 </Col>
					</Container>
				</Col>
			);
		});

		if(this.props.show){
			return (
				<div>
					<Container>
						<Row className = "Placeholder-open">
						</Row>
						<Row>
							<Col>
							</Col>
							<Col className="Open-sb sbo-container" xs ={6}>
								<Container>
									<Row>
										<Col>
										</Col>
										<Col>
										</Col>
										<Col>
											<Button type="button" className="close CloseButton" aria-label="Close" onClick={this.props.handleClose}>
    	                						<span aria-hidden="true">&times;</span>
	                  						</Button>
										</Col>
									</Row>
									<Row>
										<Col className="title-sbo">
											<h1>Select a storyboard to open</h1>
										</Col>
									</Row>
									<Row className = "main-display-sbo">
										<Container>
											<Row>
											{ getFiles }
											</Row>
										</Container>
									</Row>
								</Container>
							</Col>
							<Col>
							</Col>
						</Row>
					</Container>
				</div>
			);
		}
		else{
			return (<div></div>);
		}
	}

}
export default OpenSection