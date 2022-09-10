import React from "react";
import { Link } from "react-router-dom";

import FeedComment from "./FeedComment";

const FeedContents = ({
  likeCnt,
  userName,
  feedContents,
  commentCnt,
  feedComments,
}) => {
  return (
    <div className={"feed-comment"}>
      <h3 className={"margin-b-8"}>{`좋아요 ${likeCnt}개`}</h3>
      <div className={"feed-comment-user " + "margin-b-4 "}>
        <h3 className={""}>{userName}&nbsp;</h3>
        <p>
          {feedContents}
          {/* <button
    className={"feed-comment-btn"}
    onClick={() => setIsContentShown(!isContentShown)}
    onClick={() => console.log("click")}
  >
    더 보기
  </button> */}
        </p>
      </div>
      <Link
        className={"feed-comment-btn " + "margin-b-4 "}
        to={{ pathname: `/` }}
      >
        {`댓글 ${commentCnt}개 모두 보기`}
      </Link>
      {feedComments.map((comment) => (
        <FeedComment {...comment} />
      ))}
      <p className={"datetime"}>4일 전</p>
    </div>
  );
};

export default FeedContents;
