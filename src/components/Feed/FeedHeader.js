import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MenuBox from "../MenuBox";
import { deleteFeed } from "../../redux/actions";

const FeedHeader = ({
  feedId,
  userName,
  feedLocation,
  isFeedOwner,
  isDetail,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const userAccountName = useSelector((state) => state.userAccountName);
  const dispatch = useDispatch();
  let history = useHistory();

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
        const { status } = await dispatch(deleteFeed(feedId));

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
    isFeedOwner
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
  return (
    <header className={"feed-header"}>
      <div className={"feed-header-photo"} />
      <div className={"feed-header-content"}>
        <Link to={`/`} className={"feed-username"}>
          {userName}
        </Link>
        <p>{feedLocation}</p>
      </div>
      <button className={"feed-header-btn"} onClick={(e) => setShowMenu(true)}>
        ...
      </button>
      {showMenu ? <MenuBox menus={menus} /> : null}
      {showDeleteMenu ? <MenuBox menus={deleteMenus} /> : null}
    </header>
  );
};

export default FeedHeader;
