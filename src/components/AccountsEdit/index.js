import React, {
  useState,
  useEffect,
  // useLayoutEffect,
  // useRef,
  // useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
//   import { useDispatch, useSelector } from "react-redux";

//   import { getFollowingUserFeeds } from "../../redux/actions";
import Header from "../Header";
import "../../resources/button.css";
import "./accountsEdit.css";

const AccountsEdit = () => {
  return (
    <section className={"aedit-section "}>
      <Header />
      <div className={"aedit-content-container "}>
        <div className={"aedit-content-box "}>
          <ul className={"aedit-box-left-nav "}>
            <li>
              <Link to={"/accounts/edit"}>
                <div className={"aedit-box-left-nav-title nav-title-active"}>
                  프로필 편집
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/accounts/edit"}>
                <div className={"aedit-box-left-nav-title "}>비밀번호 변경</div>
              </Link>
            </li>
          </ul>
          <article className={"aedit-box-content "}>
            <div className={"aedit-box-header "}>
              <div className={"aedit-header-left "}>
                <button title="프로필 사진 바꾸기">
                  <img src="https://cdn.famtimes.co.kr/news/photo/202012/502160_3250_588.png" />
                </button>
              </div>
              <div className={"aedit-header-right "}>
                <h1 className={"aedit-header-username "}>UserName001</h1>
                <button className={"white-blue-btn "}>
                  프로필 사진 바꾸기
                </button>
              </div>
            </div>
            <form className={"aedit-box-form "} method="POST">
              <div className={"aedit-box-el "}>
                <aside className={"aedit-box-el-title "}>
                  <label>이름</label>
                </aside>
                <div className={"aedit-box-el-content "}>
                  <input
                    placeholder="이름"
                    type="text"
                    className={"aedit-box-el-content-input "}
                    value={"name1"}
                  />
                </div>
              </div>
              <div className={"aedit-box-el "}>
                <aside className={"aedit-box-el-title "}>
                  <label>이메일</label>
                </aside>
                <div className={"aedit-box-el-content "}>
                  <input
                    placeholder="이메일"
                    type="text"
                    className={"aedit-box-el-content-input "}
                    value={"email@test.com"}
                  />
                </div>
              </div>
              <div className={"aedit-box-el "}>
                <aside className={"aedit-box-el-title "}>
                  <label>전화번호</label>
                </aside>
                <div className={"aedit-box-el-content "}>
                  <input
                    placeholder="전화번호"
                    type="text"
                    className={"aedit-box-el-content-input "}
                    value={"010-1234-1234"}
                  />
                </div>
              </div>
              <div className={"aedit-box-el mt-16 "}>
                <aside className={"aedit-box-el-title "}></aside>
                <div className={"aedit-box-el-content "}>
                  <button className={"blue-white-btn "} disabled>
                    제출
                  </button>
                </div>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AccountsEdit;
