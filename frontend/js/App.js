

import React from 'react';
import { hot } from 'react-hot-loader/root';
// import { Router } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import MenuBar from './components/menubar'
import SentryBoundary from './utils/SentryBoundary';

const App = () => (
  <>
    <SentryBoundary>
      <Router>
        <div>
          <MenuBar />
          <hr />
          <Switch>
            {/* <Route exact path="/">
              <Redirect to="/home" />
            </Route> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </SentryBoundary>
  </>
);


export default hot(App);
