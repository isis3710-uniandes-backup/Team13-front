import React, { Component } from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import './openSection.css';
import {FormattedMessage} from 'react-intl';

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

class OpenSection extends Component {

	constructor(props){
		super(props);
    	this.state = {
    		storyboards: []
    	};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ storyboards: nextProps.storyboardsIn});  
    }

    addStoryboard = (e) => {
        e.preventDefault();
        const newID = getNewId(this.state.storyboards)
        const newStoryboard = {
    		"id": newID,
    		"timestamp": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
    		"title": "Some Title"
  		}
        this.setState({
            storyboards: [...this.state.storyboards, newStoryboard]
        })
        this.props.addStoryboardBE(newStoryboard)
    }

    onEdit = (index) => {
        this.props.getStoryboardBE(index)
    }

    removeStoryboard = (index) => {
        this.props.removeStoryboardBE(index)
        this.props.handleLoad()
    }

	render() {
		const getStoryboards = this.state.storyboards.map((f) => {
			return (
				<Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://static3planetadelibroscom.cdnstatics.com/usuaris/web_minisite/fotos/1/original/148__c_comic_mobile3.jpg" />
                <Card.Body>
                    <Card.Title>
                        { f.title }
                    </Card.Title>
                    <Button variant="primary" onClick={() => this.onEdit(f.id)}><FormattedMessage id="Edit"/></Button>
							<Button variant="primary" onClick={() => this.removeStoryboard(f.id)}><FormattedMessage id="Remove"/></Button>
                </Card.Body>
            	</Card>
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
											<b><FormattedMessage id="Click on"/></b>
										</Col>
									</Row>
									<Row className = "main-display-sbo">
										<Container>
											<Row>
											{ getStoryboards }
											<Col>
                                				<Button variant="primary" onClick={(e) => this.addStoryboard(e)}><FormattedMessage id="Add"/></Button>
                           					</Col>
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