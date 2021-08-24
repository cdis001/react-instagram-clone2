import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import LoginForm from "../Auth/login";

const App = () => {
  return (
    <Router className="App">
      <Switch>
        <Route path="/" exact component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default App;
