import React, { Component } from 'react';
import { Card, Button, Col, Row, Container, Breadcrumb } from 'react-bootstrap';
import './openSection.css';
import {FormattedMessage} from 'react-intl';
import {FaUserPlus,FaMarker,FaTrash} from "react-icons/fa/index";

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
				<Card style={{ width: '13rem' }}>
                <Card.Img alt = "storyboard image" variant="top" src="https://live.staticflickr.com/1703/25397451530_014f042484_b.jpg" />
                <Card.Body>
                    <Card.Title>
                        {f.id}. { f.title }
                    </Card.Title>
                    <Button variant="secondary" onClick={() => this.onEdit(f.id)}><FormattedMessage id="Edit"/><FaMarker/> </Button>
							<Button variant="secondary" onClick={() => this.removeStoryboard(f.id)}><FormattedMessage id="Remove"/> <FaTrash/></Button>
                </Card.Body>
            	</Card>
			);
		});

		if(this.props.show){
			return (
				<div className="openSection">
					<Container>
						<Row className = "Placeholder-open">
						</Row>
						<Row>
							<Col xs ={3}>
								<Breadcrumb>
									<Breadcrumb.Item onClick={this.props.goBackToGamemode}>Gamemode</Breadcrumb.Item>
									<Breadcrumb.Item onClick={this.props.goBackToNewOrOpen}>
										Storyboard
									</Breadcrumb.Item>
									<Breadcrumb.Item active>Open Existing</Breadcrumb.Item>
								</Breadcrumb>
							</Col>
							<Col className="Open-sb sbo-container" xs ={9}>
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
											<h1><FormattedMessage id="SelectOpen"/></h1>
											<b><FormattedMessage id="Click on"/></b>
										</Col>
									</Row>
									<Row className = "main-display-sbo">
										<Container>
											<Row>
											{ getStoryboards }
											<Col>
                                				<Button variant="secondary" onClick={(e) => this.addStoryboard(e)}><FormattedMessage id="Add"/> <FaUserPlus/></Button>
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
