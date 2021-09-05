import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getFeeds } from "../../redux/actions";
// import Header from "../Header";
import "./home.css";
import "./feed.css";
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

    // const token = localStorage.getItem("accountName") || "";
    // // console.log(token);

    dispatch(getFeeds()).then((res) => {
      // console.log(res);
      const { payload } = res;

      if (payload.status === 200) {
        const data = payload.data;
        setFeeds(data);
      } else {
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
      {/* <Header /> */}
      <div className={"home-content-container "}>
        <div className={"home-content-left "}>
          <article className={"feed-article"}>
            <header className={"feed-header"}>
              <div className={"feed-header-photo"} />
              <div className={"feed-header-content"}>
                <Link to={`/`} className={"feed-username"}>
                  accountName01
                </Link>
                <p>Location1</p>
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
              // src={imgSrc}
              src={`http://www.astronomer.rocks/news/photo/201802/82361_623_1441.jpeg`}
              sizes={"614px"}
              alt={"feedImg"}
            />
            <div className={"feed-activate"}>
              <div className="feed-actions">
                <button onClick={() => console.log("123")}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={"feed-action-icons "}
                  />
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
                <h3 className={"margin-b-8"}>좋아요 3000개</h3>
                <div className={"feed-comment-user " + "margin-b-4 "}>
                  <h3 className={""}>accountName01&nbsp;</h3>
                  <p>
                    123123123123123
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
                  댓글 5개 모두 보기
                </Link>
                <div className={"feed-comment-component"}>
                  <h3>username2</h3>
                  <p>&nbsp;content</p>
                  <button onClick={() => console.log("123")}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={"feed-comment-icon "}
                    />
                  </button>
                </div>
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
