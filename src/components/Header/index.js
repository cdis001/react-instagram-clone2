import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import "../../resources/button.css";
import Logo from "../../resources/images/title_logo.png";
import { logout } from "../../redux/actions";

import LIKED_BOARD_DATA from "./LikedBoardContent.json";

const LikedBoard = ({ isLikedBoardContent, data }) => {
  // console.log(data);

  if (isLikedBoardContent) {
    const userName = data.user.user_name;
    const userProFile = data.user.profile_photo;

    const activity = data.activity;
    const commentContent = data.content;
    const activityForm = () => {
      switch (activity) {
        case "like":
          return `님이 회원님의 사진을 좋아합니다.`;
        case "comment":
          return `님이 댓글에서 회원님을 언급했습니다: ${commentContent}`;
        default:
          return "";
      }
    };

    const date = data.date;
    const photo = data.photo;
    return (
      <>
        <div className="liked-board-content ">
          <div className="user-profile-img " src={userProFile} />
          <p className="liked-board-p ">
            <Link to="/">{userName}</Link>
            {activityForm()}
            <time dateTime={date}>2주</time>
          </p>
          <div className="liked-board-feed-photo" src={photo} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={"menu-like-img "}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <h2>게시물 활동</h2>
        <h2>
          다른 사람이 회원님의 게시물을 좋아하거나 댓글을 남기면 여기에
          표시됩니다.
        </h2>
      </>
    );
  }
};

const Header = ({ mode = "default" }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [pathname, setPathname] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedBoardContent, setLikedBoardContent] = useState(true);
  const [isUsered, setIsUsered] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(false);
  const [userName, setUserName] = useState("");

  const searchInput = useRef();
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setPathname(location.pathname);

    setUserName("userName01");
  }, []);

  const _logout = async () => {
    await dispatch(logout());
    history.push("/accounts/login");
  };

  const HeaderContent = () => {
    return (
      <>
        <div className="header-search">
          <input
            className={
              "header-search-input " +
              (isPlaceholderShown ? "" : "focus-invisible ")
            }
            type="text"
            value={isPlaceholderShown ? searchKeyword : ""}
            placeholder="검색"
            onChange={(e) => setSearchKeyword(e.target.value)}
            onBlur={(e) => {
              setIsPlaceholderShown(false);
            }}
            ref={searchInput}
          />
          {isPlaceholderShown ? (
            <>
              <button
                className={"cancel-btn "}
                tabIndex="0"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchKeyword("");
                  searchInput.current.blur();
                  setIsPlaceholderShown(false);
                }}
              >
                <span>x</span>
              </button>
            </>
          ) : (
            <div
              className="header-search-placeholder"
              onClick={(e) => {
                e.preventDefault();
                setIsPlaceholderShown(true);
                searchInput.current.focus();
              }}
            >
              <FontAwesomeIcon
                icon={solid.faSearch}
                className={"search-img "}
              />
              <span>{searchKeyword.length > 0 ? searchKeyword : "검색"}</span>
            </div>
          )}
        </div>
        <div className="header-btns" tabIndex="0">
          {isLogin ? (
            <>
              <button
                className={"header-icon "}
                onClick={() => history.push("/")}
              >
                <ion-icon
                  class={"header-icon-img "}
                  name={pathname === "/" ? "home-sharp" : "home-outline"}
                ></ion-icon>
              </button>
              <button
                className={"header-icon "}
                onClick={() => history.push("/direct/inbox")}
              >
                <ion-icon
                  class={"header-icon-img "}
                  name={
                    pathname === "/direct/inbox"
                      ? "paper-plane"
                      : "paper-plane-outline"
                  }
                ></ion-icon>
              </button>
              <button
                className={"header-icon "}
                onClick={() => history.push("/explore")}
              >
                <ion-icon
                  class={"header-icon-img "}
                  name={pathname === "/explore" ? "compass" : "compass-outline"}
                ></ion-icon>
              </button>
              <button
                className={"header-icon "}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLiked) {
                    setPathname("");
                  } else {
                    setPathname(location.pathname);
                  }
                  setIsLiked(!isLiked);
                  setIsUsered(false);
                  setPathname("");
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  setIsLiked(false);
                  setPathname(location.pathname);
                }}
              >
                <ion-icon
                  class={"header-icon-img "}
                  name={isLiked ? "heart" : "heart-outline"}
                ></ion-icon>
              </button>
              {isLiked ? (
                <div
                  className={"header-menu " + "liked-menu "}
                  aria-hidden={!isLiked}
                >
                  <div className={"menu-top " + "menu-top-liked "} />
                  <div
                    className={
                      "menu-content " +
                      "menu-content-liked " +
                      (isLikedBoardContent
                        ? "liked-board-exist "
                        : "liked-board-empty ")
                    }
                  >
                    {isLikedBoardContent ? (
                      LIKED_BOARD_DATA.data.map((data) => (
                        <LikedBoard
                          isLikedBoardContent={isLikedBoardContent}
                          data={data}
                        />
                      ))
                    ) : (
                      <LikedBoard isLikedBoardContent={isLikedBoardContent} />
                    )}
                  </div>
                </div>
              ) : null}
              <button
                className={"header-icon " + "header-icon-user "}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isUsered) {
                    setPathname("");
                  } else {
                    setPathname(location.pathname);
                  }
                  setIsUsered(!isUsered);
                  setIsLiked(false);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  setIsUsered(false);
                  setPathname(location.pathname);
                }}
              >
                {isUsered ? <div /> : null}
                <img
                  className={"header-icon-img "}
                  src={
                    "http://www.astronomer.rocks/news/photo/201802/82361_623_1441.jpeg"
                  }
                  alt={"user"}
                />
              </button>
              {isUsered ? (
                <div
                  className={"header-menu " + "user-menu "}
                  aria-hidden={!isUsered}
                >
                  <div className={"menu-top " + "menu-top-user "} />
                  <div className={"menu-content "}>
                    <Link className={"user-menu-a"} to={`/${userName}`}>
                      <FontAwesomeIcon icon={faUserCircle} />
                      <span>프로필</span>
                    </Link>
                    <Link className={"user-menu-a"} to="/">
                      <FontAwesomeIcon icon={faBookmark} />
                      <span>저장됨</span>
                    </Link>
                    <Link className={"user-menu-a " + "margin-b-4 "} to="/">
                      <FontAwesomeIcon icon={solid.faCog} />
                      <span>설정</span>
                    </Link>
                    <hr className={"menu-hr"} />
                    <button
                      className={"user-menu-a " + "margin-b-4 "}
                      onClick={_logout}
                    >
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <Link
                to="/accounts/login"
                className={"blue-white-btn " + "margin-l-14 "}
              >
                로그인
              </Link>
              <Link
                to="/accounts/emailsignup"
                className={"white-blue-btn " + "margin-l-14 "}
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="header-container">
      <div className="header-contant">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        {mode === "none" ? null : <HeaderContent />}
      </div>
    </div>
  );
};

export default Header;
