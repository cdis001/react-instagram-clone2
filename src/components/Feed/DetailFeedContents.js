import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DetailFeedComment from "./DetailFeedComment";

const DetailFeedContents = ({
  userName,
  feedContents,
  feedComments,
  setFeedComments,
}) => {
  return (
    <div className={"detail-feed-comment padding-16"}>
      <div className={"feed-comment-user " + "margin-b-4 "}>
        <div className={"feed-header-photo"} />
        <h3 className={"margin-l-15 " + "feed-username "}>{userName}&nbsp;</h3>
        <p className={"feed-comment-p "}>{feedContents}</p>
      </div>
      {feedComments.map((comment) => (
        <DetailFeedComment
          {...comment}
          feedComments={feedComments}
          setFeedComments={setFeedComments}
        />
      ))}
    </div>
  );
};

export default DetailFeedContents;
