import React from "react";

import "./feedDetail.css";
import Feed from "../Feed";
import Header from "../Header";
import feedsData from "../Home/feedsData.json";

const FeedDetail = () => {
  const feed = feedsData[0];
  console.log(feed);
  return (
    <section className={`feed-detail-section `}>
      <Header />
      <Feed type={"detail"} {...feed} />
    </section>
  );
};

export default FeedDetail;
