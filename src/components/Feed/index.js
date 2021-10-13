import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./feed.css";

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

const Feed = ({ user, contents, location, files, comments, like }) => {
  const { userName } = user;
  const feedContents = contents;
  const feedLocation = location;
  const feedImg = files[0].src;
  const feedComments = comments;
  const commentCnt = comments.length;
  const likeCnt = like.length;
  return (
    <article className={"feed-article"}>
      <header className={"feed-header"}>
        <div className={"feed-header-photo"} />
        <div className={"feed-header-content"}>
          <Link to={`/`} className={"feed-username"}>
            {userName}
          </Link>
          <p>{feedLocation}</p>
        </div>
        <button
          className={"feed-header-btn"}
          onClick={(e) => console.log("button")}
        >
          ...
        </button>
      </header>

      <img
        className={"feed-photo"}
        src={feedImg}
        // src={`http://www.astronomer.rocks/news/photo/201802/82361_623_1441.jpeg`}
        sizes={"614px"}
        alt={"feedImg"}
      />
      <div className={"feed-activate"}>
        <div className="feed-actions">
          <button onClick={() => console.log("123")}>
            <FontAwesomeIcon icon={faHeart} className={"feed-action-icons "} />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faComment}
              className={"feed-action-icons "}
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={"feed-action-icons "}
            />
          </button>
          <button onClick={() => console.log("123")}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={"feed-action-icons "}
            />
          </button>
        </div>

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
        <div className={"feed-comment-box"}>
          <FontAwesomeIcon
            icon={faSmile}
            className={"feed-action-icons " + "padding-r-16 "}
          />
          <textarea
            placeholder={"댓글 달기..."}
            // value={commentText}
            // onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className={"white-blue-btn"}
            // disabled={commentText.length > 0 ? false : true}
          >
            게시
          </button>
        </div>
      </div>
    </article>
  );
};

export default Feed;
