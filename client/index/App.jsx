import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import Login from '@client/page/verify/Login.jsx';
import Layout from '@client/page/layout/Main.jsx';
import Test from '@client/page/test/Test.jsx';

export default () =>
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
