import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { deleteFeed, addComment, deleteComment } from "../../redux/actions";

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

const DetailFeedComment = ({ id, contents, user }) => {
  const [isCommentHovering, setIsCommentHovering] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [showCommentDeleteMenu, setShowCommentDeleteMenu] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const { userName } = user;
  const commentContents = contents;
  const commentId = id;
  const commentDeleteMenus = [
    {
      id: 1,
      title: `댓글을 삭제하시겠어요?`,
      buttonStyle: "menu-title",
    },
    {
      id: 2,
      title: "삭제",
      onClick: async () => {
        const { status } = await dispatch(deleteComment(commentId, userId));
        if (status === 200 || status === 201) {
          setShowCommentDeleteMenu(false);
          window.location.reload();
        } else {
          alert("실패");
        }
      },
      buttonStyle: "menu-red-b",
    },
    {
      id: 3,
      title: "취소",
      onClick: () => setShowCommentDeleteMenu(false),
    },
  ];
  const commentMenus = [
    { id: 1, title: "신고", onClick: () => {}, buttonStyle: "menu-red-b" },
    {
      id: 2,
      title: "삭제",
      onClick: async () => {
        setShowCommentMenu(false);
        setShowCommentDeleteMenu(true);
      },
      buttonStyle: "menu-red-b",
    },
    { id: 4, title: "취소", onClick: () => setShowCommentMenu(false) },
  ];
  return (
    <div
      className={"padding-t-12"}
      onMouseEnter={() => setIsCommentHovering(true)}
      onMouseLeave={() => setIsCommentHovering(false)}
    >
      <div className={"flex-direction-r"}>
        <div className={"feed-header-photo"} />
        <p className={"feed-comment-p margin-l-14"}>
          <span className={"feed-username "}>{userName}</span>
          {commentContents}
          <div className="margin-t-16 flex-direction-r">
            <p className={"datetime font-size-12 "}>4일 전</p>
            {isCommentHovering ? (
              <button
                className={"feed-detail-commnet-btn "}
                onClick={(e) => setShowCommentMenu(true)}
              >
                ...
              </button>
            ) : (
              ""
            )}
          </div>
        </p>
      </div>
      <div className={"margin-l-46"}></div>
      {showCommentMenu ? <MenuBox menus={commentMenus} /> : null}
      {showCommentDeleteMenu ? <MenuBox menus={commentDeleteMenus} /> : null}
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
  id,
  user,
  contents,
  location,
  files,
  comments,
  likes,
  type = "default",
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [feedComments, setFeedComments] = useState(comments);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const userAccountName = useSelector((state) => state.userAccountName);

  let history = useHistory();

  const feedId = id;
  const { userName, id: feedOwnerId } = user;
  const feedContents = contents;
  const feedLocation = location;
  const feedImg = files[0];
  const commentCnt = feedComments.length;
  const likeCnt = likes.length;
  const detailType = type === "detail" ? "detail-feed-" : null;
  const isDetail = type === "detail";
  const deleteMenus = [
    {
      id: 1,
      title: `게시물을 삭제하시겠어요?`,
      buttonStyle: "menu-title",
    },
    {
      id: 2,
      title: "삭제",
      onClick: async () => {
        const { status } = await dispatch(deleteFeed(id));

        if (status === 200 || status === 201) {
          setShowDeleteMenu(false);
          history.push(`/${userAccountName}`);
        } else {
          alert("실패");
        }
      },
      buttonStyle: "menu-red-b",
    },
    {
      id: 3,
      title: "취소",
      onClick: () => setShowDeleteMenu(false),
    },
  ];
  const menus = [
    { id: 1, title: "신고", onClick: () => {}, buttonStyle: "menu-red-b" },
    userId === feedOwnerId
      ? {
          id: 2,
          title: "삭제",
          onClick: async () => {
            setShowMenu(false);
            setShowDeleteMenu(true);
          },
          buttonStyle: "menu-red-b",
        }
      : {
          id: 2,
          title: "팔로우 취소",
          onClick: () => {},
          buttonStyle: "menu-red-b",
        },
    isDetail
      ? { id: -1, buttonStyle: "display-none" }
      : {
          id: 3,
          title: "게시물로 이동",
          onClick: () => {
            history.push({ pathname: `/p/${feedId}` });
          },
        },
    { id: 4, title: "취소", onClick: () => setShowMenu(false) },
  ];

  const _onCommentAdd = async () => {
    const commentData = {
      userId,
      feedId,
      contents: commentText,
    };

    const { status, comment } = await dispatch(addComment(commentData));

    if (status === 200 || status === 201) {
      setFeedComments([...feedComments, comment]);
      setCommentText("");
    } else {
      alert("댓글 등록 실패");
    }
  };

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
                key={id}
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
          <FeedCommentBox
            isDetail={isDetail}
            commentText={commentText}
            setCommentText={setCommentText}
            _onCommentAdd={_onCommentAdd}
          />
          {showDeleteMenu ? <MenuBox menus={deleteMenus} /> : null}
        </div>
      </div>
    </article>
  );
};

export default Feed;
