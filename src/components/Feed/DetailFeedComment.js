import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MenuBox from "../MenuBox";
import { deleteComment } from "../../redux/actions";

const DetailFeedComment = ({
  id,
  contents,
  user,
  feedComments,
  setFeedComments,
}) => {
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

          const commentBox = feedComments.filter(
            (data) => data.id !== commentId
          );
          setFeedComments([...commentBox]);
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

export default DetailFeedComment;
