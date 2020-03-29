import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Nav />
  </Router>,
  document.getElementById('root')
);

