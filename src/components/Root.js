import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreateQuestionary from "./CreateQuestionary";
import AskQuestionaryView from "./AskQuestionaryView";
import MyAskques from "./MyAskques";
import QuestionnaireStatistics from "./QuestionnaireStatistics";
import EditQuestionary from "./EditQuestionary";
import MyAnswersView from "./MyAnswersView";
import AnswerOfQuestionaryView from "./AnswerOfQuestionaryView";

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/create-questionary" component={props => <CreateQuestionary/>} />
          <PrivateRoute exact path="/ask-questionary" component={props => <AskQuestionaryView/>} />
          <PrivateRoute path="/ask-questionary/:hash" component={props => <AskQuestionaryView/>} />
          <PrivateRoute path="/my-questionaries" component={props => <MyAskques/>} />
          <PrivateRoute path="/my-answers" component={props => <MyAnswersView/>} />
          <PrivateRoute
            path="/ask-results/:hash"
            component={QuestionnaireStatistics}
          />
          
          <PrivateRoute path="/edit-questionary/:hash" component={props => <EditQuestionary/>} />
          <PrivateRoute
            path="/answers-questionary/:hash"
            component={props => <AnswerOfQuestionaryView/>}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: "/login", state: { from: props.location }}} />
      )
    }
  />
)
