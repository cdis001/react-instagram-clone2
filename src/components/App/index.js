import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import LoginForm from "../Auth/login";

const App = () => {
  return (
    <Router className="App">
      <Switch>
        <Route path="/" exact component={LoginForm} />
        {/*https://www.instagram.com/accounts/login/?source=auth_switcher*/}
        <Route path="/accounts/login" exact component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default App;
