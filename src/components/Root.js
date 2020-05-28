import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Register2 from "./Register2";
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
          <Route path="/register2" component={Register2} />
          <Route path="/register" component={Register} />
          <Route path="/create-questionary" component={CreateQuestionary} />
          <Route path="/ask-questionary" component={AskQuestionaryView} />
          <Route path="/my-questionaries" component={MyAskques} />
          <Route path="/my-answers" component={MyAnswersView} />
          <Route
            path="/ask-results/:hash"
            component={QuestionnaireStatistics}
          />
          <Route path="/edit-questionary/:hash" component={EditQuestionary} />
          <Route
            path="/answers-questionary/:hash"
            component={AnswerOfQuestionaryView}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
