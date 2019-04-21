import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal} from 'react-bootstrap';
import './confirmation.css'
import {FormattedMessage} from "react-intl";

class Confirmation extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.active) {
            return (
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FormattedMessage id={this.props.title}/>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            <FormattedMessage id={this.props.content}/>
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">
                            <FormattedMessage id="Cancel"/>
                        </Button>
                        <Button variant="primary">
                            <FormattedMessage id="Okay"/>
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            );
        } else {
            return (
                <div />
            );
        }
    }
}
export default Confirmation;
