import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home"
import Login from "./Login"
import Register from './Register'
import CreateQuestionary from "./CreateQuestionary"
import AskQuestionary from "./AskQuestionary"
import MyAskques from "./MyAskques"
import AskResults from "./AskResults"
import EditQuestionary from './EditQuestionary'
import conf from '../model/urlConfiguration'

export default class Root extends Component {
  render() {
    return <Router>
      <Switch>
        <Route path={conf.LOGIN_URL} component={Login} />
        <Route path={conf.REGISTER_URL} component={Register} />
        <Route path={conf.CREATE_QUESTIONARY_URL} component={CreateQuestionary} />
        <Route path={conf.ASK_QUESTIONARY} component={AskQuestionary} />
        <Route path={conf.QUESTIONARIES_URL} component={MyAskques} />
        <Route path={conf.QUESTIONARY_RESULTS_URL} component={AskResults} />
        <Route path={conf.EDIT_QUESTIONARY_URL} component={EditQuestionary} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  }
}