import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFollowingUserFeeds } from "../../redux/actions";
import Feed from "../Feed";
import Header from "../Header";
import "./home.css";
import "../../resources/button.css";
import FollowButton from "../FollowButton";

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
  const [feedsData, setFeedsData] = useState([]);
  const [index, setIndex] = useState(0);

  let history = useHistory();

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  // const token = useSelector((state) => state.token);
  const following = useSelector((state) => state.userFollowing);
  // console.log(isLogin);
  // console.log(token);
  // console.log("follower", follower);
  // console.log("following", following);
  // const feeds = feedsData;

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(async () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "Instagram";

    const followingIds = following.map((data) => {
      return { id: data.following.id };
    });

    const { feeds, status } = await dispatch(
      getFollowingUserFeeds(followingIds, index)
    );

    if (status === 200 || status === 201) {
      setFeedsData(feeds);
    } else {
      alert("불러오기 실패");
    }

    if (!isLogin) {
      history.push("/accounts/login");
    }
    // if (isNewbie) {
    //   history.push("/explore/people/suggested");
    // }
  }, []);

  const isFollowed = (userId) => {
    if (following.length > 0) {
      const data = following.filter((data) => data.following.id === userId);

      if (data.length > 0) {
        return true;
      }
    }

    return false;
  };

  return (
    <section className={"home-section "}>
      <Header />
      <div className={"home-content-container "}>
        <div className={"home-content-left "}>
          {feedsData.map((feed) => (
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
                <FollowButton followingId="2" isFollowed={isFollowed(2)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
