import React, { Component } from 'react';
import './gameModeSelection.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {FaRegNewspaper} from 'react-icons/fa';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';

class GameModeSelection extends Component {

  render() {
      if (this.props.show) {
          return (
              <Container>
                  <div className = "selection">
                      <Row>
                          <div className = "title">
                              <h1><b><FormattedMessage id="Game Mode"/></b></h1>
                          </div>
                      </Row>
                      <Row>
                          <Col>
                          </Col>
                          <Col>
                          </Col>
                          <Col>
                              <div className = "Feature-cont" onClick={this.props.onClick}>
                                  <div className = "Feature1 Feature-core">
                                      <FaRegNewspaper className="Icon"/>
                                  </div>
                                  <b className="text">Storyboarding</b>
                              </div>
                          </Col>
                          <Col>
                          </Col>
                          <Col>
                          </Col>
                      </Row>
                  </div>
              </Container>
          );
      } else {
          return (<div/>)
      }

  }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user    
    };
}

const connectedGameMode = connect(mapStateToProps)(GameModeSelection);
export { connectedGameMode as GameModeSelection };

//export default GameModeSelection;
