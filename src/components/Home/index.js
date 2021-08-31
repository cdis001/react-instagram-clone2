import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { fetchImages } from "../../redux/actions";
// import Header from "../Header";
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

    // const token = localStorage.getItem("accountName") || "";
    // // console.log(token);

    // dispatch(fetchImages()).then((res) => {
    //   // console.log(res);
    //   const { payload } = res;

    //   if (payload.status === 200) {
    //     const data = payload.data.content;
    //     setFeeds(data);
    //   } else {
    //   }
    // });

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
          {/* {feeds.map((feed) => (
            <FeedPhoto key={feed.id} detailed={false} feed={feed} />
          ))} */}
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
          {/* <RecommendContent type="short" data={data} /> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
