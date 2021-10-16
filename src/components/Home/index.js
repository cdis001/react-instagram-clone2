import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getFeeds } from "../../redux/actions";
import Feed from "../Feed";
import Header from "../Header";
import feedsData from "./feedsData.json";
import "./home.css";
import "../../resources/button.css";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Home = () => {
  const [isNewbie, setIsNewbie] = useState(false);
  const [feeds, setFeeds] = useState([]);

  let history = useHistory();
  const dispatch = useDispatch();
  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "Instagram";
    // setFeeds(feedsData);

    // const token = localStorage.getItem("accountName") || "";
    // // console.log(token);

    dispatch(getFeeds()).then((res) => {
      // console.log(res);
      const { payload } = res;

      if (payload.status === 200) {
        const data = payload.data;
        setFeeds(data);
      } else {
        alert("불러오기 실패");
      }
    });

    // if (token.length <= 0) {
    //   history.push("/accounts/login");
    // }
    // if (isNewbie) {
    //   history.push("/explore/people/suggested");
    // }
  }, []);

  return (
    <section className={"home-section "}>
      <Header />
      <div className={"home-content-container "}>
        <div className={"home-content-left "}>
          {feeds.map((feed) => (
            <Feed key={feed.id} {...feed} />
          ))}
        </div>
        <div
          className={"home-content-right "}
          style={{ left: (windowWidth - 935) / 2 + 642 + "px" }}
        >
          <div className={"home-user-proflie "}>
            <Link to="/">
              <div className="home-user-photo " />
            </Link>
            <div className="home-proflie-div ">
              <Link className="home-user-name " to="/">
                userName
              </Link>
              <p className="home-user-content ">content</p>
            </div>
          </div>
          <div className={"user-recommend-container "}>
            <div className={" user-recommend-title "}>
              <h4>회원님을 위한 추천</h4>
              <Link to="/explore/people/suggested">모두 보기</Link>
            </div>
            <div className={"user-recommend-div "}>
              <div className={"user-recommend-content "}>
                <img
                  className={"recommend-user-photo "}
                  src={
                    "https://i.guim.co.uk/img/media/976161556e63867b492868c15e86ea71b4165c52/0_165_5315_3189/master/5315.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b4e203c07941288dab171a18905ad374"
                  }
                />
                <div className={"recommend-user-profile "}>
                  <Link className={"recommend-user-name "} to={"/"}>
                    userName01
                  </Link>
                  <span className={"recommend-user-content "}>content</span>
                </div>
                <button className={"white-blue-btn " + "user-follow-btn "}>
                  팔로우
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
