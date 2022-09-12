import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./feedDetail.css";
import Feed from "../Feed";
import Header from "../Header";
import feedsData from "../Home/feedsData.json";
import { getFeedByFeedId } from "../../redux/actions";

const FeedDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  // const [feed, setFeed] = useState(feedsData[0]);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(async () => {
    const { feedData, status } = await dispatch(getFeedByFeedId(id));
    console.log(feedData);

    if (status === 200 || status === 201) {
      setFeed(feedData);
      setIsLoading(false);
    } else {
      alert("불러오기 실패");
    }
  }, []);

  return (
    <section className={`feed-detail-section `}>
      <Header />
      {isLoading ? null : <Feed type={"detail"} {...feed} />}
    </section>
  );
};

export default FeedDetail;
