import React from "react";

import "./feedThumbnail.css";

const FeedThumbnail = () => {
  return (
    <div className={"feed-thumbnail-container"}>
      <div className={"feed-thumbnail-box-1"}>
        <div className={"feed-thumbnail-content-1"}>
          <img
            className={"feed-thumbnail-img-big"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
        <div className={"feed-thumbnail-content-2"}>
          <img
            className={"feed-thumbnail-img"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
        <div className={"feed-thumbnail-content-2"}>
          <img
            className={"feed-thumbnail-img"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
      </div>
      <div className={"feed-thumbnail-box-2"}>
        <div className={"feed-thumbnail-content-2"}>
          <img
            className={"feed-thumbnail-img"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
        <div className={"feed-thumbnail-content-2"}>
          <img
            className={"feed-thumbnail-img"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
        <div className={"feed-thumbnail-content-2"}>
          <img
            className={"feed-thumbnail-img"}
            src={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
            }
            sizes={"292.984375px"}
            srcSet={
              "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeedThumbnail;
