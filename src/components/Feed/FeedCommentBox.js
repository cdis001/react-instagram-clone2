import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSmile } from "@fortawesome/free-regular-svg-icons";

import FeedComment from "./FeedComment";

const FeedCommentBox = ({
  isDetail,
  commentText,
  setCommentText,
  _onCommentAdd,
}) => {
  return (
    <div className={`feed-comment-box ${isDetail ? "margin-t-14 " : ""}`}>
      <FontAwesomeIcon
        icon={faSmile}
        className={"feed-action-icons " + "padding-r-16 "}
      />
      <textarea
        placeholder={"댓글 달기..."}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className={"white-blue-btn"}
        disabled={commentText.length > 0 ? false : true}
        onClick={_onCommentAdd}
      >
        게시
      </button>
    </div>
  );
};

export default FeedCommentBox;
