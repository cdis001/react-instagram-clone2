import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faCog, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header";
import FeedThumbnail from "../FeedThumbnail";
import feedsData from "../Home/feedsData.json";
import "../../resources/button.css";
import "./userPage.css";

const FeedThumbnails = ({ feeds }) => {
  return (
    <div className={"feed-page-thumbnail-row"}>
      {feeds.map((feed) => {
        const likeCount = feed.likes.length;
        const commentCount = feed.comments.length;
        // console.log(feed);
        return (
          <Link
            to={{ pathname: `/p/${feed.id}`, state: { feed } }}
            key={feed.id}
          >
            <div className={"feed-page-thumbnail-hover"}>
              <FontAwesomeIcon icon={faHeart} />
              <h2>{likeCount}</h2>
              <FontAwesomeIcon icon={faComment} />
              <h2>{commentCount}</h2>
            </div>
            <img src={feed.files[0].src} />
          </Link>
        );
      })}
    </div>
  );
};

const UserPageBtns = () => {
  return (
    <div className={"feed-page-btns"}>
      <button className={"blue-white-btn margin-l-20"}>팔로우</button>
    </div>
  );
};

const MyPageBtns = () => {
  return (
    <div className={"feed-page-btns"}>
      <button className={"feed-page-profile-setting margin-l-20"}>
        프로필 편집
      </button>
      <button className={"feed-page-user-setting"}>
        <FontAwesomeIcon
          icon={faCog}
          className={"feed-action-icons " + "padding-r-16 "}
        />
      </button>
      <Link className={"feed-page-add"} to="#">
        +
      </Link>
    </div>
  );
};

const UserPage = () => {
  const [isMyPage, setIsMyPage] = useState(true);
  const location = useLocation();
  const userName = location.pathname.slice(1);

  const dispatch = useDispatch();
  return (
    <section className={"user-feed-page-section "}>
      <Header />
      <div className={"feed-page-container"}>
        <header className={"feed-page-header"}>
          <div className={"feed-page-user-photo"}>
            <img />
          </div>
          <div className={"feed-page-user-content"}>
            <div className={"feed-page-user-inform"}>
              <h1>{userName}</h1>
              {isMyPage ? <MyPageBtns /> : <UserPageBtns />}
            </div>
            <ul className={"feed-page-header-ul"}>
              <li>
                <span>
                  게시물 <span className={"font-weight-600"}>10</span>
                </span>
              </li>
              <li>
                <span>
                  팔로워 <span className={"font-weight-600"}>1000</span>
                </span>
              </li>
              <li>
                <span>
                  팔로우 <span className={"font-weight-600"}>100</span>
                </span>
              </li>
            </ul>
            <h2 className={"font-weight-600"}>content</h2>
          </div>
        </header>
        <div className={"feed-page-thumbnail-container"}>
          <FeedThumbnails feeds={feedsData} />
        </div>
      </div>
    </section>
  );
};

export default UserPage;
