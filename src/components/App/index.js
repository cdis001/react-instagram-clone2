import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import Auth from "../Auth";
import Home from "../Home";
import DM from "../DirectInbox";

const App = () => {
  return (
    <Router className="App">
      <Switch>
        {/* https://www.instagram.com/ */}
        <Route path="/" exact component={Home} />
        {/* https://www.instagram.com/accounts/login/?source=auth_switcher */}
        <Route
          path="/accounts/login"
          exact
          component={() => <Auth action="login" />}
        />
        {/* https://www.instagram.com/accounts/emailsignup/ */}
        <Route
          path="/accounts/emailsignup"
          exact
          component={() => <Auth action="signup" />}
        />
        {/* https://www.instagram.com/direct/inbox/ */}
        <Route path="/direct/inbox/" exact component={DM} />
      </Switch>
    </Router>
  );
};

export default App;
