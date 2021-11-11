import React, { useState } from "react";

import "./feedThumbnail.css";

const RowFeedBox = ({ type = "md", isFloatRight }) => {
  const classType = type === "lg" ? "-lg" : "-md";
  const imgSize = type === "lg" ? "height-614" : "height-293";
  const float = isFloatRight ? "float-r" : "float-l";

  return (
    <div className={[`feed-thumbnail-box${classType}`]}>
      <div className={`feed-thumbnail-content${classType} ${float}`}>
        <img
          className={`feed-thumbnail-img ${imgSize}`}
          src={
            "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
          }
          srcSet={
            "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
          }
        />
      </div>
      <div className={"feed-thumbnail-content-md"}>
        <img
          className={"feed-thumbnail-img height-293"}
          src={
            "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg"
          }
          sizes={"292.984375px"}
          srcSet={
            "http://www.jejusori.net/news/photo/202104/328170_336901_1756.jpg 1080w"
          }
        />
      </div>
      <div className={"feed-thumbnail-content-md"}>
        <img
          className={"feed-thumbnail-img height-293"}
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
  );
};

const FeedThumbnail = () => {
  const [isFloatRight, setIsFloatRight] = useState(true);
  return (
    <div className={"feed-thumbnail-container"}>
      <RowFeedBox type={"lg"} isFloatRight={isFloatRight} />
      <RowFeedBox type={"md"} />
      <RowFeedBox type={"md"} />
      <RowFeedBox type={"md"} />
      <RowFeedBox type={"md"} />
    </div>
  );
};

export default FeedThumbnail;
