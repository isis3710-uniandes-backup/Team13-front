import React, { Component } from 'react';
import './gameModeSelection.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {FaRegNewspaper} from 'react-icons/fa';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Button} from 'react-bootstrap';
import {Breadcrumb} from 'react-bootstrap';


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
                        <Breadcrumb>
                            <Breadcrumb.Item active>
                              <FormattedMessage id="GameMode-Bread"/>
                            </Breadcrumb.Item>
                        </Breadcrumb>                      
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
                                  <Button aria-label="Start Storyboarding"className = "btnSelect" type="button" variant="secondary">
                                    <b className="text">Storyboarding</b>
                                  </Button>
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
