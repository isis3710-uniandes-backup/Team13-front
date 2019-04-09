import React, {Component} from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import {NavBarComponent} from "../../homePage/navBarComponent/navBarComponent";
import Storyboard from "../storyboard/storyboard";
import Edit from "../edit/edit";
import {GameModeSelection} from "../gameModeSection/gameModeSelection";
import NewOrOpenSection from "../newOrOpenSection/newOrOpenSection";
import OpenSection from "../openSection/openSection";
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import  { Redirect } from 'react-router-dom';


class Main extends Component {

    constructor(props)
    {
        super(props);
        this.state =
            {
                showStoryboard: false,
                showEdition: false,
                showGameMode: true,
                showNewOrOpen: false,
                showOpen: false,
                goHome: false,
                storyboards:[],
                cards:[],
                currentCard: -1
        };

        //Si no hay login, debe reenviar al inicio.
        if(this.props.user === undefined || this.props.user === null){
            this.state.goHome = true;
        }
        else{
            if(!this.props.user.isLoggedIn){
                this.state.goHome = true;
            }
        }

        this.changeStoryboardView = this.changeStoryboardView.bind(this);
        this.changeView = this.changeView.bind(this);
        this.changeViewMode = this.changeViewMode.bind(this);
        this.changeStoryboardView = this.changeStoryboardView.bind(this);
        this.openStoryboardNewOrOpen = this.openStoryboardNewOrOpen.bind(this);
        this.handleCloseShowNewOrOpen = this.handleCloseShowNewOrOpen.bind(this);
        this.handleStoryboardOpen = this.handleStoryboardOpen.bind(this);
        this.handleStoryboardOpenClose = this.handleStoryboardOpenClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
    }

    changeStoryboardView(event) {
        this.setState({
            showStoryboard: !this.state.showStoryboard
        });
        if(event) event.preventDefault();
    }
    changeView() {
        this.setState({
                showStoryboard: false,
                showEdition: true,
                showGameMode: false,
                showNewOrOpen: false,
                showOpen: false
        });
    }
    changeViewMode(event) {
            this.setState({
                    showStoryboard: true,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: false,
                    showOpen: false
                });
    }

    openStoryboardNewOrOpen(){
        this.setState({
                    showStoryboard: false,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: true,
                    showOpen: false
                });
    }

    handleCloseShowNewOrOpen(event){
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: true,
            showNewOrOpen: false,
            showOpen: false
        });
    }

    handleStoryboardOpen(event){
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: false,
            showNewOrOpen: false,
            showOpen: true
        });
    }

    handleStoryboardOpenClose(event){
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: false,
            showNewOrOpen: true,
            showOpen: false
        });
    }

    handleLogout(event){
        this.props.dispatch(userActions.logout());
        this.state.goHome = true;
    }

    componentDidMount(){
        fetch("/api/storyboards")
        .then(res => {
        return res.json()}).then(res => {
            this.setState({storyboards:res})
        });
        fetch("/api/cards")
        .then(res => {
        return res.json()}).then(res => {
            this.setState({cards:res})
        });
    }

    addCardBE = (newCard) => {
        fetch('/api/cards', {
            method: 'post',
            body: JSON.stringify(newCard),
            headers : { 
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
        return res.json();
        }).then(function(res) {
        });
    }

    getCardBE = (index) => {
        fetch('/api/cards'+'/'+index)
        .then(res => {
        return res.json()}).then(res => {
            this.setState({currentCard:res.id})
        });
    }

    updateCardBE = (index, newCard) => {
        fetch('/api/cards'+'/'+index, {
            method: 'put',
            body: JSON.stringify(newCard),
            headers : { 
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
        return res.json();
        }).then(function(res) {
        });
    }

    removeCardBE = (index) => {
        fetch('/api/cards'+'/'+index, {
            method: 'delete',
        }).then(response =>
            response.json().then(json => {
                return json;
            })
        );
    }

    closeEditor(){
        this.setState({
            showStoryboard: true,
            showEdition: false,
            showGameMode: false,
            showNewOrOpen: false,
            showOpen: false,
            goHome: false,
            cards:[],
            currentCard: -1

        });

        this.componentDidMount();
    }
    
    render() {
        const cardsToSend = this.state.cards;
        const idToSend = this.state.currentCard;
        return (
            <div className="Main">
                <GameModeSelection show={ this.state.showGameMode } onClick={ this.openStoryboardNewOrOpen } />
                <Storyboard addCardBE={this.addCardBE} getCardBE={this.getCardBE} removeCardBE={this.removeCardBE}
                cardsIn={cardsToSend} show={ this.state.showStoryboard } onEdit={ this.changeView }/>
                <Edit theID={idToSend} show={ this.state.showEdition} updateCardBE={this.updateCardBE} closeEditor={this.closeEditor}/>
                <NewOrOpenSection show={ this.state.showNewOrOpen} handleClose ={this.handleCloseShowNewOrOpen} 
                    handleNew={this.handleStoryboardOpen} handleLoad={this.handleStoryboardOpen} 
                    handleNewStoryboard={this.changeView}/>
                 <OpenSection show={this.state.showOpen} handleClose={this.handleStoryboardOpenClose}
                    handleSelected={this.changeViewMode}/>
                <NavBarComponent loggedIn={true} handleNew = {() => {console.log('todo');}} 
                handleLoad = {this.handleStoryboardOpen} handleLogout = {this.handleLogout}/>
                
                {
                    this.state.goHome &&
                    <Redirect to='/'  />
                }
            </div>
           
        );
    }
}

function mapStateToProps(state) {

    const { user } = state.authentication;

    return {
        user
    };
}

const connectedMainPage = connect(mapStateToProps)(Main);
export { connectedMainPage as Main };

//export default Main;
