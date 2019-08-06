import React, { Component } from 'react';
//import logo from './logo.svg';
//import { UserAgent } from "react-useragent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home"
import Login from "./Login"
import Register from './Register'
import CreateQuestionary from "./CreateQuestionary"
import AskQuestionary from "./AskQuestionary"
import MyAskques from "./MyAskques"
import 'typeface-roboto';

export default class Root extends Component {
  render() {
    return <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-questionary" component={CreateQuestionary} />
        <Route path="/ask-questionary" component={AskQuestionary} />
        <Route path="/my-askques" component={MyAskques} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  }
}