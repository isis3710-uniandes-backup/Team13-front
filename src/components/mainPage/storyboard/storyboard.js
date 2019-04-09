import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import './storyboard.css';

class Storyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cardsIn});  
    }

    addCard = (e) => {
        e.preventDefault();
        const newCard = {
            id: 3,
            storyboardId:1,
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
        const newIndex = index+1;
        this.props.getCardBE(newIndex)
        this.props.onEdit()
    }

    removeCard = (index) => {
        this.setState(({cards}) => {
          const mCards = [ ...cards ]
          mCards.splice(index, 1)
          return { cards: mCards }
        })
        const newIndex = index+1;
        this.props.removeCardBE(newIndex)
    }

    render() {
        const getCards = this.state.cards.map((c,index) => {
            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://static3planetadelibroscom.cdnstatics.com/usuaris/web_minisite/fotos/1/original/148__c_comic_mobile3.jpg" />
                    <Card.Body>
                        <Card.Title>
                            { c.title }
                        </Card.Title>
                        <Card.Text>
                            { c.text }
                        </Card.Text>
                            <Button variant="primary" onClick={() => this.onEdit(index)}>Editar</Button>
                        <Button variant="primary" onClick={() => this.removeCard(index)}>Borrar</Button>
                    </Card.Body>
                </Card>);
        })
        if (this.props.show ) {
            return (
                <div className="Storyboard">
                    <Container>
                        <Row>
                            <Col>
                                <button type="button" class="close close-btn" aria-label="Close" onClick = {this.props.closeStoryboard}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            { getCards }
                            <Col>
                                <Button variant="primary" onClick={(e) => this.addCard(e)}>Agregar</Button>
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