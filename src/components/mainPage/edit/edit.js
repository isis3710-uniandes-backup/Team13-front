import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container } from 'react-bootstrap';
import './edit.css'
import reactCSS from 'reactcss'
import imgSave from "./save.svg";
import imgClear from "./clear.svg";
import imgUndo from "./undo.svg";
import { SketchPicker } from 'react-color'
import CanvasDraw from 'react-canvas-draw'


class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            story: {
                id: 0,
                text: 'asdfasdfasdfasdf asaas asa',
                img: 'https://www.thoughtco.com/thmb/tD1o8DnemQmw3rHcT8c0S1Xh6Gk=/900x506/smart/filters:no_upscale()/draw-comic-superhero-56a26d6d3df78cf772758a45'
            },
            brushColor: "rgba(0,0,0,1)",
            color: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
            },
            width: 700,
            height: 300,
            brushRadius: 5,
            lazyRadius: 0,
            currentID: -1,
            storyboardId: 1,
            title: "New Card",
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            txtArea: "Some awesome text for your card :)"
        };
    }

    componentWillReceiveProps(nextProps) {
        fetch('/api/cards'+'/'+nextProps.theID)
        .then(res => {
        return res.json()}).then(res => {
            this.setState({
                currentID:res.id,
                storyboardId:res.storyboardId,
                title:res.title,
                imageURL:res.imageURL,
                timestamp:res.timestamp,
                txtArea:res.text
            })
        });
    }

    handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb})
        let newColor = `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},
        ${this.state.color.a})`
        this.setState({brushColor: newColor})
    };

    updateCard = (e,name) => {
        e.preventDefault();
        let newTitle = this.inputTitle.value;
        let newTxt = this.inputTxt.value
        localStorage.setItem(name,
                        this.saveableCanvas.getSaveData())
        const newCard = {
            id: 3,
            storyboardId:1,
            title:newTitle,
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: newTxt
        }
        if(this.state.currentID != -1 && this.state.currentID != undefined){
            this.props.updateCardBE(this.state.currentID,newCard)
        }
    }

    render() {
        const styles = reactCSS({
          'default': {
            color: {
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#fff',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '99',
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
        });
        if (this.props.show) {
            return (
                <div className="Edit">
        <Container>
            <Row>
                <input type="text" defaultValue={this.state.title} ref={(ref) => this.inputTitle = ref}/>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <label>Canvas Width:</label>
                    </Row>
                    <Row>
                        <input type="number" value={this.state.width} onChange={e =>
                        this.setState({ width: parseInt(e.target.value, 10) })}/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <label>Canvas Height:</label>
                    </Row>
                    <Row>
                        <input type="number" value={this.state.height} onChange={e =>
                        this.setState({ height: parseInt(e.target.value, 10) })}/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <label>Brush Radius:</label>
                    </Row>
                    <Row>
                        <input type="number" value={this.state.brushRadius} onChange={e =>
                        this.setState({ brushRadius: parseInt(e.target.value, 10) })}/>
                    </Row>
                </Col>  
                <Col>
                    <Row>
                        <label>Lazy Radius:</label>
                    </Row>
                    <Row>
                        <input type="number" value={this.state.lazyRadius} onChange={e =>
                        this.setState({ lazyRadius: parseInt(e.target.value, 10) })}/>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={2}>
                    <Row>
                        <input type="image" src={imgSave} className="btTxt"
                        width="60" height ="60" 
                        onClick={(e) => this.updateCard(e,"savedDrawing")}/>
                    </Row>
                    <br/>
                    <Row>
                        <input type="image" src={imgUndo} className="btTxt"
                        width="60" height ="60" 
                        onClick={() => {this.saveableCanvas.undo();}}/>
                    </Row>
                    <br/>
                    <Row>
                        <input type="image" src={imgClear} className="btTxt"
                        width="60" height ="60" 
                        onClick={() => {this.saveableCanvas.clear();}}/>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <div style={ styles.swatch } onClick={ this.handleClick }>
                              <div style={ styles.color } />
                            </div>
                            { this.state.displayColorPicker ? <div style={ styles.popover }>
                              <div style={ styles.cover } onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                            </div> : null }
                        </Col>
                    </Row>    
                </Col>
                <Col xs={10}>
                    <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.brushColor}
                    brushRadius={this.state.brushRadius}
                    lazyRadius={this.state.lazyRadius}
                    canvasWidth={this.state.width}
                    saveData={localStorage.getItem("savedDrawing")}
                    canvasHeight={this.state.height}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <input className="txtInEditor" type="text" defaultValue={this.state.txtArea} ref={(ref) => this.inputTxt = ref}/>
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

export default Edit;