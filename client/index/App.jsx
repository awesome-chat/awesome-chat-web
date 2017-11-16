import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '@client/page/verify/Login.jsx';

export default () =>
  <Router>
    <Route path="/" component={Login} />
  </Router>
