import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";

const FeedActions = () => {
  return (
    <div className="feed-actions">
      <button onClick={() => console.log("123")}>
        <FontAwesomeIcon icon={faHeart} className={"feed-action-icons "} />
      </button>
      <button>
        <FontAwesomeIcon icon={faComment} className={"feed-action-icons "} />
      </button>
      <button>
        <FontAwesomeIcon icon={faPaperPlane} className={"feed-action-icons "} />
      </button>
      <button onClick={() => console.log("123")}>
        <FontAwesomeIcon icon={faBookmark} className={"feed-action-icons "} />
      </button>
    </div>
  );
};

export default FeedActions;
