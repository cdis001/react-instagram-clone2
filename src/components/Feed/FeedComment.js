import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const FeedComment = ({ contents, user }) => {
  const { userName } = user;
  const commentContents = contents;
  return (
    <div className={"feed-comment-component"}>
      <h3>{userName}</h3>
      <p>&nbsp;{commentContents}</p>
      <button onClick={() => console.log("123")}>
        <FontAwesomeIcon icon={faHeart} className={"feed-comment-icon "} />
      </button>
    </div>
  );
};

export default FeedComment;
