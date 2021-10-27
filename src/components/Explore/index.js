import React from "react";

import "./explore.css";
import FeedThumbnail from "../FeedThumbnail";
import Header from "../Header";

const Explore = () => {
  return (
    <section className={"explore-section "}>
      <Header />
      <div className={"explore-content-container "}>
        <FeedThumbnail />
      </div>
    </section>
  );
};

export default Explore;
