

import React from 'react';
import { hot } from 'react-hot-loader/root';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import JudesFavorite from './pages/JudesFavorite'
import MenuBar from './components/menubar'
import SentryBoundary from './utils/SentryBoundary';
import { size } from 'lodash';
import BasicPage from './pages/templates/BasicPage';
import CircleGame from './pages/CircleGame';

const App = () => (


  <>
    <SentryBoundary>
      <Router>
        <div>
          <div>
          {/* <hr /> */}
          <Switch>
            <Route exact path="/" component={() => <Home/> } />
            <Route exact path="/home" component={() => <Home/> } />
            <Route path="/about" component={() => <BasicPage name={"About"} /> }/>
            <Route path="/dashboard" component={ () => <Dashboard/> } />
            <Route path="/CircleGame" component={() => <CircleGame /> } />
            <Route path="/JudesFavorite" component={() => <JudesFavorite/> } />
          </Switch>
          </div>


        </div>
      </Router>
    </SentryBoundary>
  </>
);


export default hot(App);
