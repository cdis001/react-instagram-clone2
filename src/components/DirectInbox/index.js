import React from "react";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header";
import "./directInbox.css";

const LeftContent = () => {
  return (
    <div className={"dm-left-message-profile "}>
      <div className={"dm-left-profile-img "} />
      <div className={"dm-left-message "}>
        <span className={"dm-left-profile-name text-style-a "}>userName02</span>
        <div className={"dm-left-message-contents text-style-a "}>
          <p className={"dm-left-message-thumbnail "}>
            contents123contents123contents123contents123contents123contents123contents123contents123contents123contents123
          </p>
          <span>·</span>
          <time>3일</time>
        </div>
      </div>
    </div>
  );
};

const DirectInbox = () => {
  return (
    <section className={"dm-section "}>
      <Header />
      <div className={"dm-content-container "}>
        <div className={"dm-content-box "}>
          <div className={"dm-content-left "}></div>
          <div className={"dm-content-right "}></div>
        </div>
      </div>
    </section>
  );
};

export default DirectInbox;
