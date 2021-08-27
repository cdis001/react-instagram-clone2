import React from "react";

import "./index.css";
import "../../resources/button.css";
import LoginForm from "./login";
import SignUpForm from "./signup";

const Auth = ({ action = "login" }) => {
  return (
    <section className={"auth-component"}>
      <div className="auth-container">
        {action === "signup" ? <SignUpForm /> : <LoginForm />}
      </div>
    </section>
  );
};

export default Auth;
