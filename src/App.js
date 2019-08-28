import React, { Fragment } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import HomePage from './containers/HomePage/index.js';
import GiphyPage from './containers/GiphyPage/index.js';


function App () {
  return (
    <Fragment>
      <Router>
        <div className="header">
          <Link to="/home" className="navlink">Home</Link>
          <Link to="/giphy" className="navlink">Giphy</Link>
        </div>
        <Redirect exact from="/" to="home" />
        <Route path="/home" component={HomePage} />
        <Route path="/giphy" component={GiphyPage} />
      </Router>
    </Fragment>
  );
}

export default App;
