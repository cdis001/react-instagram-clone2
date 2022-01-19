import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";

import "../../resources/button.css";
import "./FeedAddForm.css";

const FeedAddForm = ({ setIsFeedAddFormShow }) => {
  return (
    <div className="feedAddForm-component">
      <div className="feedAddForm-cancelBtn">
        <button onClick={() => setIsFeedAddFormShow(false)}>✕</button>
      </div>
      <div className="feedAddForm-contentBox">
        <div className="feedAddForm-contentBox-header">
          <h1>새 게시물 만들기</h1>
        </div>
        <div className="feedAddForm-contentBox-content">
          <FontAwesomeIcon
            icon={faPhotoVideo}
            className={"feedAddForm-photoIcon "}
          />
          <h2>사진과 동영상을 여기에 끌어다 놓으세요</h2>

          <button className="blue-white-btn">컴퓨터에서 선택</button>
        </div>
      </div>
    </div>
  );
};

export default FeedAddForm;
