import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Home} from './components/homePage/home/home';
import {Main} from './components/mainPage/main/main';
import { connect } from 'react-redux';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import My404Component from "./components/homePage/404/My404Component";


class MainRouter extends Component {

  render() {

      // Acá van los componentes que se van a mostrar con su respectiva URL. El de HOME es el único que funciona por el momento
    return (
      <Router>
          <Switch>
                    <Route exact path="/" component={Home}/>
              <Switch>
                    <Route path="/#intro" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/main" component={Main}/>
                    <Route path='*' exact={true} component={My404Component} />
              </Switch>
          </Switch>
      </Router>
    );
  }
}
function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(MainRouter);
export { connectedApp as MainRouter }; 

//export default MainRouter;

