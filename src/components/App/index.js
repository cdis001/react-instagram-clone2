import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import Auth from "../Auth";

const App = () => {
  return (
    <Router className="App">
      <Switch>
        <Route path="/" exact component={Auth} />
        {/* https://www.instagram.com/accounts/login/?source=auth_switcher */}
        <Route path="/accounts/login" exact component={() => <Auth action="login" />} />
        {/* https://www.instagram.com/accounts/emailsignup/ */}
        <Route path="/accounts/emailsignup" exact component={() => <Auth action="signup" />} />
      </Switch>
    </Router>
  );
};

export default App;
