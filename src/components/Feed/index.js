import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import MenuBox from "../MenuBox";

const FeedCommentBox = ({ isDetail }) => {
  return (
    <div className={`feed-comment-box ${isDetail ? "margin-t-14 " : ""}`}>
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
  );
};

const DetailFeedComment = ({ contents, user }) => {
  const { userName } = user;
  const commentContents = contents;
  return (
    <div className={"padding-t-12"}>
      <div className={"flex-direction-r"}>
        <div className={"feed-header-photo"} />
        <p className={"feed-comment-p margin-l-14"}>
          <span className={"feed-username "}>{userName}</span>
          {commentContents}
          <p className={"datetime font-size-12 margin-t-16"}>4일 전</p>
        </p>
      </div>
      <div className={"margin-l-46"}></div>
    </div>
  );
};

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

const DetailFeedContents = ({ userName, feedContents, feedComments }) => {
  return (
    <div className={"detail-feed-comment padding-16"}>
      <div className={"feed-comment-user " + "margin-b-4 "}>
        <div className={"feed-header-photo"} />
        <h3 className={"margin-l-15 " + "feed-username "}>{userName}&nbsp;</h3>
        <p className={"feed-comment-p "}>{feedContents}</p>
      </div>
      {feedComments.map((comment) => (
        <DetailFeedComment {...comment} />
      ))}
      {feedComments.map((comment) => (
        <DetailFeedComment {...comment} />
      ))}
      {feedComments.map((comment) => (
        <DetailFeedComment {...comment} />
      ))}
    </div>
  );
};

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

const FeedHeader = ({
  userName,
  feedLocation,
  setShowMenu,
  showMenu,
  menus,
}) => {
  return (
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
        // onClick={(e) => console.log("button")}
        onClick={(e) => setShowMenu(true)}
      >
        ...
      </button>
      {showMenu ? <MenuBox menus={menus} /> : null}
    </header>
  );
};

const Feed = ({
  user,
  contents,
  location,
  files,
  comments,
  likes,
  type = "default",
}) => {
  const [showMenu, setShowMenu] = useState(false);

  let history = useHistory();

  const { userName } = user;
  const feedContents = contents;
  const feedLocation = location;
  const feedImg = files[0];
  const feedComments = comments;
  const commentCnt = comments.length;
  const likeCnt = likes.length;
  const detailType = type === "detail" ? "detail-feed-" : null;
  const isDetail = type === "detail";
  const menus = [
    { id: 1, title: "신고", onClick: () => {}, buttonStyle: "menu-red-b" },
    {
      id: 2,
      title: "팔로우 취소",
      onClick: () => {},
      buttonStyle: "menu-red-b",
    },
    {
      id: 3,
      title: "게시물로 이동",
      onClick: () => {
        history.push({ pathname: `/p/1` });
      },
    },
    { id: 4, title: "취소", onClick: () => setShowMenu(false) },
  ];

  return (
    <article
      className={`feed-article ${isDetail ? " detail-feed-article" : ""}`}
    >
      {isDetail ? null : (
        <FeedHeader
          userName={userName}
          feedLocation={feedLocation}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          menus={menus}
        />
      )}
      <div className={`${isDetail ? "detail-feed-photo-div" : ""}`}>
        <img
          className={`feed-photo ${isDetail ? " detail-feed-photo" : ""}`}
          // src={feedImg}
          src={`http://www.astronomer.rocks/news/photo/201802/82361_623_1441.jpeg`}
          sizes={"614px"}
          alt={"feedImg"}
        />
      </div>
      <div className={`${isDetail ? "detail-feed-activate-box" : ""}`}>
        {isDetail ? (
          <FeedHeader
            userName={userName}
            feedLocation={feedLocation}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            menus={menus}
          />
        ) : null}
        <div className={`${isDetail ? "detail-feed-activate" : ""}`}>
          {isDetail ? (
            <>
              <DetailFeedContents
                userName={userName}
                feedContents={feedContents}
                feedComments={feedComments}
              />
              <FeedActions />
              <h3
                className={"font-size-14 margin-b-8 margin-t-8 padding-h-16"}
              >{`좋아요 ${likeCnt}개`}</h3>
              <p className={"datetime padding-h-16"}>3일전</p>
            </>
          ) : (
            <>
              <FeedActions />
              <FeedContents
                likeCnt={likeCnt}
                userName={userName}
                feedContents={feedContents}
                commentCnt={commentCnt}
                feedComments={feedComments}
                isDetail={isDetail}
              />
            </>
          )}
          <FeedCommentBox isDetail={isDetail} />
        </div>
      </div>
    </article>
  );
};

export default Feed;
