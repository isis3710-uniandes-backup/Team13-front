import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Home} from './components/homePage/home/home';
import {Main} from './components/mainPage/main/main';
import { connect } from 'react-redux';



import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import My404Component from "./components/homePage/404/My404Component";


class MainRouter extends Component {

  render() {

      // Este es de ejemplo mientras sacamos los otros componentes
  function Topics({match}) {
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>

                <Route path={`${match.path}/:topicId`} component={Topic}/>
                <Route
                    exact
                    path={match.path}
                    render={() => <h3>Please select a topic.</h3>}
                />
            </div>
        );
    }

      // Este es de ejemplo mientras sacamos los otros componentes

    function

    Topic({match}) {
        return (
            <div>
                <h3>{match.params.topicId}</h3>
            </div>
        );
    }

      // Acá van los componentes que se van a mostrar con su respectiva URL. El de HOME es el único que funciona por el momento
    return (
      <Router>
                    <Route exact path="/" component={Home}/>
                    <Route path="/#intro" component={Home}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path='*' component={My404Component} />
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

