import React, { Component } from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavBarComponent } from "../../homePage/navBarComponent/navBarComponent";
import Storyboard from "../storyboard/storyboard";
import Edit from "../edit/edit";
import { GameModeSelection } from "../gameModeSection/gameModeSelection";
import NewOrOpenSection from "../newOrOpenSection/newOrOpenSection";
import OpenSection from "../openSection/openSection";
import Statistics from "../statistics/statistics";
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import { Redirect } from 'react-router-dom';

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ date: '03/01/2014', value: 70},{ date: '04/01/2014', value: 20},{ date: '05/01/2014', value: 50},{ date: '06/01/2014', value: 10}],
            size: [1000,500],
            showStoryboard: false,
            showEdition: false,
            showGameMode: true,
            showNewOrOpen: false,
            showOpen: false,
            goHome: false,
            showStatistics: false,
            cards: [],
            currentStoryboard: -1,
            currentCard: -1,
            storyboards: [],
            loggedIn: true
        };


        //Si no hay login, debe reenviar al inicio.
        if (this.props.user === undefined || this.props.user === null) {
            this.state.goHome = true;

        } else {
            if (!this.props.user.isLoggedIn) {
                this.state.goHome = true;
            }
        }

        if (this.props.user) {
            fetch("http://localhost:3001/api/users/isLogin", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'token': this.props.user.token })
            }).then((res) => {
                return res.json()
            }).then((res) => {

                if (!res.valid) {
                    this.setState({
                        goHome: true,
                        loggedIn: false
                    })
                }
            })
        }

        this.changeStoryboardView = this.changeStoryboardView.bind(this);
        this.changeView = this.changeView.bind(this);
        this.changeStoryboardView = this.changeStoryboardView.bind(this);
        this.openStoryboardNewOrOpen = this.openStoryboardNewOrOpen.bind(this);
        this.handleCloseShowNewOrOpen = this.handleCloseShowNewOrOpen.bind(this);
        this.handleStoryboardOpen = this.handleStoryboardOpen.bind(this);
        this.handleStatistics = this.handleStatistics.bind(this);
        this.handleStoryboardOpenClose = this.handleStoryboardOpenClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
        this.closeStoryboard = this.closeStoryboard.bind(this);
        this.addStoryboardBE = this.addStoryboardBE.bind(this);
        this.getStoryboardBE = this.getStoryboardBE.bind(this);
        this.updateStoryboardBE = this.updateStoryboardBE.bind(this);
        this.removeStoryboardBE = this.removeStoryboardBE.bind(this);
        this.addCardBE = this.addCardBE.bind(this);
        this.getCardBE = this.getCardBE.bind(this);
        this.updateCardBE = this.updateCardBE.bind(this);
        this.removeCardBE = this.removeCardBE.bind(this);



    }

    changeStoryboardView(event) {
        this.setState({
            showStoryboard: !this.state.showStoryboard
        });
        if (event) event.preventDefault();
    }
    changeView() {
        if(!navigator.onLine){
            let newStoryboard = {
                "id": 1,
                "timestamp": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
                "title": "Some Title"
            }
            this.setState({
                showStoryboard: true,
                showEdition: false,
                showGameMode: false,
                showNewOrOpen: false,
                showOpen: false,
                goHome: false,
                currentStoryboard: 1
            })
        }else{
            fetch("http://localhost:3001/api/storyboards", {
                headers: {
                    'Authorization': `Bearer ${this.props.user.token}`,
                }
            })
            .then(res => {
                return res.json()
            }).then(res => {
                let newID = getNewId(res)
                console.log(res)
                let newStoryboard = {
                    "id": newID,
                    "timestamp": (new Date()).toString(),
                    "title": "Some Title",
                    "userID": this.props.user.uid
                }
                this.addStoryboardBE(newStoryboard)
                this.setState({
                    showStoryboard: true,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: false,
                    showOpen: false,
                    goHome: false,
                    currentStoryboard: newID
                })
            });
        }   
    }

    openStoryboardNewOrOpen() {
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: false,
            showNewOrOpen: true,
            showOpen: false,
            goHome: false,
            cards: [],
            currentCard: -1,
            storyboards: [],
            currentStoryboard: -1
        });
    }

    handleCloseShowNewOrOpen(event) {
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: true,
            showNewOrOpen: false,
            showOpen: false,
            goHome: false,
            cards: [],
            currentCard: -1,
            storyboards: [],
            currentStoryboard: -1
        });
    }

    handleStoryboardOpen(event) {
        if(!navigator.onLine){
            alert("¡No tienes internet! No puedes ver los storyboards guardados pero puedes crear nuevos.");
        }else{
            fetch("http://localhost:3001/api/storyboards", {
                headers: {
                    'Authorization': `Bearer ${this.props.user.token}`,
                }
            })
            .then(res => {
                return res.json()
            }).then(res => {
                this.setState({
                    showStoryboard: false,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: false,
                    showOpen: true,
                    goHome: false,
                    cards: [],
                    currentCard: -1,
                    currentStoryboard: -1,
                    storyboards: res
                })
            });
        }
    }


    handleStatistics(event) {
        fetch("http://localhost:3001/api/storyboards", {
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`,
            }
        })
            .then(res => {
                return res.json()
            }).then(res => {
            this.setState({
                showStoryboard: false,
                showEdition: false,
                showGameMode: false,
                showNewOrOpen: false,
                showOpen: false,
                showStatistics: true,
                goHome: false,
                cards: [],
                currentCard: -1,
                currentStoryboard: -1,
                storyboards: res
            })
        });
    }

    handleStoryboardOpenClose(event) {
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: false,
            showNewOrOpen: true,
            showOpen: false,
            goHome: false,
            cards: [],
            currentCard: -1,
            storyboards: [],
            currentStoryboard: -1
        });
    }

    closeStoryboard() {
        this.setState({
            showStoryboard: false,
            showEdition: false,
            showGameMode: true,
            showNewOrOpen: false,
            showOpen: false,
            goHome: false,
            cards: [],
            currentCard: -1,
            storyboards: [],
            currentStoryboard: -1
        });
    }

    handleLogout(event) {
        this.props.dispatch(userActions.logout());
        this.setState({
            goHome: true
        });
    }

    addStoryboardBE = (newStoryboard) => {
        fetch('http://localhost:3001/api/storyboards', {
            method: 'post',
            body: JSON.stringify(newStoryboard),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(function(res) {
            return res.json();
        }).then(function(res) {});
    }

    getStoryboardBE = (index) => {
        fetch("http://localhost:3001/api/cards/story/" + index, {
                headers: {
                    'Authorization': `Bearer ${this.props.user.token}`,
                }
            })
            .then(res => {
                return res.json()
            }).then(res => {
                this.setState({
                    cards: res,
                    currentStoryboard: index,
                    showStoryboard: true,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: false,
                    showOpen: false,
                    goHome: false
                })
            });
    }

    updateStoryboardBE = (index, newStoryboard) => {
        fetch('http://localhost:3001/api/storyboards/' + index, {
            method: 'put',
            body: JSON.stringify(newStoryboard),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(function(res) {
            return res.json();
        }).then(function(res) {});
    }

    removeStoryboardBE = (index) => {
        fetch('http://localhost:3001/api/storyboards/' + index, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(response =>
            response.json().then(json => {
                console.log("Save SB");
                console.log(json);
                return json;
            })
        );
    }

    addCardBE = (newCard) => {
        fetch('http://localhost:3001/api/cards', {
            method: 'post',
            body: JSON.stringify(newCard),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(function(res) {
            return res.json();
        }).then(function(res) {});
    }

    getCardBE = (index) => {
        this.setState({
            showStoryboard: false,
            showEdition: true,
            showGameMode: false,
            showNewOrOpen: false,
            showOpen: false,
            goHome: false,
            currentCard: index
        })
    }

    updateCardBE = (index, newCard) => {
        fetch('http://localhost:3001/api/cards/' + index, {
            method: 'put',
            body: JSON.stringify(newCard),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(function(res) {
            return res.json();
        }).then(function(res) {});
    }

    removeCardBE = (index) => {
        fetch('http://localhost:3001/api/cards/' + index, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`,
            }
        }).then(response =>
            response.json().then(json => {
                return json;
            })
        );
    }

    closeEditor() {
        fetch("http://localhost:3001/api/cards/story/" + this.state.currentStoryboard, {
                headers: {
                    'Authorization': `Bearer ${this.props.user.token}`,
                }
            })
            .then(res => {
                return res.json()
            }).then(res => {
                this.setState({
                    showStoryboard: true,
                    showEdition: false,
                    showGameMode: false,
                    showNewOrOpen: false,
                    showOpen: false,
                    goHome: false,
                    cards: res
                })
            });
    }

    render() {
        let idToSend = this.state.currentCard;
        let storyIdToSend = this.state.currentStoryboard;
        return (
            <div className="Main">
                <GameModeSelection show={ this.state.showGameMode } onClick={ this.openStoryboardNewOrOpen } />
                <Storyboard user={this.props.user} theStoryID={storyIdToSend} addCardBE={this.addCardBE} getCardBE={this.getCardBE} removeCardBE={this.removeCardBE}
                cardsIn={this.state.cards} show={ this.state.showStoryboard } updateStoryboardBE={this.updateStoryboardBE}
                closeStoryboard={this.closeStoryboard} goBackToNewOrOpen={this.openStoryboardNewOrOpen} goBackToGamemode={this.handleCloseShowNewOrOpen}/>
                <Edit user={this.props.user} theCardID={idToSend} show={ this.state.showEdition} updateCardBE={this.updateCardBE} closeEditor={this.closeEditor} goBackToNewOrOpen={this.openStoryboardNewOrOpen} goBackToGamemode={this.handleCloseShowNewOrOpen}/>
                <NewOrOpenSection show={ this.state.showNewOrOpen} handleClose ={this.handleCloseShowNewOrOpen}
                    handleLoad={this.handleStoryboardOpen}
                    handleNewStoryboard={this.changeView}/>
                <OpenSection
                    user={this.props.user}
                    addStoryboardBE={this.addStoryboardBE}
                             goBackToGamemode={this.handleCloseShowNewOrOpen}
                             goBackToNewOrOpen={this.openStoryboardNewOrOpen}
                handleLoad={this.handleStoryboardOpen}
                getStoryboardBE={this.getStoryboardBE}
                removeStoryboardBE={this.removeStoryboardBE}
                storyboardsIn={this.state.storyboards} show={this.state.showOpen}
                handleClose={this.handleStoryboardOpenClose}/>
                <Statistics user={this.props.user} show={this.state.showStatistics} data={this.state.data} size={this.state.size}/>
                <NavBarComponent loggedIn={this.state.loggedIn} handleNew = {this.changeView}
                handleLoad = {this.handleStoryboardOpen} handleStatistics = {this.handleStatistics} handleLogout = {this.handleLogout}/>
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
