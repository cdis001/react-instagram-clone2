import React from "react";
import {
  faEdit,
  faPaperPlane,
  faSmile,
  faImage,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header";
import "./directInbox.css";
import "../../resources/button.css";

const MessageBox = ({ isSend = true }) => {
  const isSendMessage = isSend;
  if (isSendMessage) {
    return (
      <div className={"dm-right-message-box "}>
        <div className={"dm-right-message-profile m-r-8 m-b-8 "} />
        <div className={"dm-rignt-message-contents m-b-8 "}>
          <p>
            contents123contents123contents123contents123contents123contents123contents123contents123contents123contents123
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"dm-right-message-box dm-jc-end "}>
        <div className={"dm-rignt-message-contents m-b-8 dm-bgc-ef "}>
          <p>
            contents123contents123contents123contents123contents123contents123contents123contents123contents123contents123
          </p>
        </div>
      </div>
    );
  }
};

const MessageComponent = () => {
  return (
    <div className={"dm-right-message-main "}>
      <span className={"dm-message-time-content "}>
        2020년 7월 18일 오후 6:26
      </span>
      <MessageBox isSend={false} />
      <MessageBox isSend={true} />
    </div>
  );
};

const RightMessageContent = () => {
  return (
    <div className={"dm-content-right "}>
      <div className={"dm-header "}>
        <div className={"dm-header-user "}>
          <div className={"dm-right-message-profile "} />
          <span className={"dm-right-user-name "}>userName02</span>
        </div>
        <FontAwesomeIcon icon={faInfoCircle} className={"dm-icon-default "} />
      </div>
      <MessageComponent />
      <div className={"dm-right-send-message-component "}>
        <div className={"dm-right-send-message-box "}>
          <FontAwesomeIcon icon={faSmile} className={"dm-icon-default "} />
          <textarea placeholder={"메시지 입력"} />
          <button>
            <FontAwesomeIcon icon={faImage} className={"dm-icon-default "} />
          </button>
          <button>
            <FontAwesomeIcon icon={faHeart} className={"dm-icon-default "} />
          </button>
        </div>
      </div>
    </div>
  );
};

const RightDefaultContent = () => {
  return (
    <div className={"dm-content-right-default "}>
      <div className={"dm-right-plane-border "}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={"dm-right-plane-icon "}
        />
      </div>
      <h2 className={"dm-right-title-h2 "}>내 메시지</h2>
      <span className={"dm-right-title "}>
        친구나 그룹에 비공개 사진과 메시지를 보내보세요.
      </span>
      <button className={"blue-white-btn m-t-24"}>메시지 보내기</button>
    </div>
  );
};

const LeftContent = () => {
  return (
    <div className={"dm-left-message-profile filter-blur "}>
      <div className={"dm-left-profile-img "} />
      <div className={"dm-left-message "}>
        <span className={"dm-left-profile-name text-style-a "}>userName02</span>
        <div className={"dm-left-message-contents text-style-a "}>
          <p className={"dm-left-message-thumbnail "}>
            contents123contents123contents123contents123contents123contents123contents123contents123contents123contents123
          </p>
          <span>·</span>
          <time>3일</time>
        </div>
      </div>
    </div>
  );
};

const DirectInbox = () => {
  return (
    <section className={"dm-section "}>
      <Header />
      <div className={"dm-content-container filter-blur "}>
        <div className={"dm-content-box "}>
          <div className={"dm-content-left "}>
            <div className={"dm-header "}>
              <div className={"dm-left-foo "} />
              <span className={"dm-user-name "}>userName01</span>
              <FontAwesomeIcon icon={faEdit} className={"dm-icon-default "} />
            </div>
            <div className={"dm-left-content "}>
              <LeftContent />
              <LeftContent />
              <LeftContent />
              <LeftContent />
            </div>
          </div>
          <RightDefaultContent />
        </div>
      </div>
      <h1 className={`preparation-h1`}>준비중</h1>
    </section>
  );
};

export default DirectInbox;
