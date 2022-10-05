import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import Auth from "../Auth";
import Home from "../Home";
import DM from "../DirectInbox";
import Explore from "../Explore";
import FeedDetail from "../FeedDetail";
import UserPage from "../UserPage";
import AccountsEdit from "../AccountsEdit";

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
        <Route path="/direct/inbox" exact component={DM} />
        {/* https://www.instagram.com/explore */}
        <Route path="/explore" exact component={Explore} />
        {/* https://www.instagram.com/p/CW46CSnLXQh/?utm_medium=share_sheet */}
        <Route path="/p/:id" exact component={FeedDetail} />
        {/* https://www.instagram.com/dlwlrma */}
        <Route path="/:id" exact component={UserPage} />
        {/* https://www.instagram.com/accounts/edit/ */}
        <Route path="/accounts/edit" exact component={AccountsEdit} />
      </Switch>
    </Router>
  );
};

export default App;
