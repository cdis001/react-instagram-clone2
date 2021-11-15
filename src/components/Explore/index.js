import React from "react";

import "./explore.css";
import FeedThumbnail from "../FeedThumbnail";
import Header from "../Header";

const Explore = () => {
  return (
    <section className={"explore-section "}>
      <Header />
      <div className={"explore-content-container filter-blur"}>
        <FeedThumbnail />
      </div>
      <h1 className={`preparation-h1`}>준비중</h1>
    </section>
  );
};

export default Explore;
