import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Col, Row, Container, Breadcrumb } from 'react-bootstrap';
import './storyboard.css';
import {FormattedMessage} from 'react-intl';
import {FaUserPlus,FaMarker,FaTrash,FaSave} from "react-icons/fa/index";

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

class Storyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentID: -1,
            title: "New Card",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            cards: []
        };
    }

    componentWillReceiveProps(nextProps) {
        fetch('/api/storyboards/'+nextProps.theStoryID, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        })
        .then(res => {
        return res.json()}).then(res => {
            this.setState({
                currentID:res.id,
                title:res.title,
                timestamp:res.timestamp,
                cards:nextProps.cardsIn
            })
        });
    }

    addCard = (e) => {
        e.preventDefault();
        const newID = getNewId(this.state.cards)
        const newCard = {
            id: newID,
            storyboardId: this.state.currentID,
            title:"New Card",
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some awesome text for your card :)"
        }
        this.setState({
            cards: [...this.state.cards, newCard]
        })
        this.props.addCardBE(newCard)
    }

    onEdit = (index) => {
        this.props.getCardBE(index)
    }

    removeCard = (index) => {
        this.setState(({cards}) => {
          let mCards = [ ...cards ]
          mCards = mCards.filter(p => p.id !== index)
          return { cards: mCards }
        })
        this.props.removeCardBE(index)
    }

    updateStoryboard = (e) => {
        e.preventDefault();
        let newTitle = this.inputTitle.value;
        const newStoryboard = {
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: newTitle
        }
        if(this.state.currentID !== -1 && this.state.currentID !== undefined){
            this.props.updateStoryboardBE(this.state.currentID,newStoryboard)
        }
    }

    render() {
        const getCards = this.state.cards.map((c) => {
            return (
            <Card style={{ width: '18rem' }}>
                <Card.Img alt="card image" variant="top" src="https://static3planetadelibroscom.cdnstatics.com/usuaris/web_minisite/fotos/1/original/148__c_comic_mobile3.jpg" />
                <Card.Body>
                    <Card.Title>
                        { c.title }
                    </Card.Title>
                    <Card.Text>
                        { c.text }
                    </Card.Text>
                        <Button variant="secondary" onClick={() => this.onEdit(c.id)}><FormattedMessage id="Edit"/> <FaMarker/></Button>
                    <Button variant="secondary" onClick={() => this.removeCard(c.id)}><FormattedMessage id="Remove"/> <FaTrash/></Button>
                </Card.Body>
            </Card>);
        })
        if (this.props.show ) {
            return (
                <div className="Storyboard">
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={this.props.goBackToGamemode}>
                                <FormattedMessage id="GameMode-Bread"/>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={this.props.goBackToNewOrOpen}>
                                Storyboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active><FormattedMessage id="sbEditor"/></Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <h1 className="AxeH1"><FormattedMessage id="sbEditor"/></h1>
                        </Row>
                        <br/>
                        <Row>
                            <Col className = "no-padding">
                                <label><FormattedMessage id="sbTitle"/> </label>
                                <br/>
                                <input className="btnContrast" aria-label= "storyboard's title" type="text" defaultValue={this.state.title} ref={(ref) => this.inputTitle = ref}/>
                            </Col>
                            <Col className = "no-padding">
                                <Button className="btnContrast"  variant="secondary" onClick={(e) => this.updateStoryboard(e)}><FormattedMessage id="Guardar"/> <FaSave/></Button>
                            </Col>
                            <Col>
                                <button type="button" className="close close-btn" aria-label="Close" onClick = {this.props.closeStoryboard}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            { getCards }
                            <Col>
                                <Button className="btnContrast"  variant="secondary" onClick={(e) => this.addCard(e)}><FormattedMessage id="Add"/> <FaUserPlus/></Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {

            return (
                <div />
            );
        }
    }
}

export default Storyboard;
