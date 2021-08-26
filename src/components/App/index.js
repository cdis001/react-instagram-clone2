import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import LoginForm from "../Auth/login";
import SignUpForm from "../Auth/signup";

const App = () => {
  return (
    <Router className="App">
      <Switch>
        <Route path="/" exact component={SignUpForm} />
        {/* https://www.instagram.com/accounts/login/?source=auth_switcher */}
        <Route path="/accounts/login" exact component={LoginForm} />
        {/* https://www.instagram.com/accounts/emailsignup/ */}
        <Route path="/accounts/emailsignup" exact component={SignUpForm} />
      </Switch>
    </Router>
  );
};

export default App;
