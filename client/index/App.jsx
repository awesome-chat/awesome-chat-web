import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import Login from '@client/page/verify/Login.jsx';
import Layout from '@client/page/layout/Main.jsx';
import Info from '@client/page/info/Info.jsx';

export default () =>
  <Router>
    <Switch>
      <Route path="/" component={Layout} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
