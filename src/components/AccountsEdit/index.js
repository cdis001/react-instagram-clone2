import React, {
  useState,
  useEffect,
  // useLayoutEffect,
  // useRef,
  // useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  editUserInfo,
  getUserInfo,
  validationEmail,
  validationPhoneNumber,
} from "../../redux/actions";
import Header from "../Header";
import "../../resources/button.css";
import "./accountsEdit.css";

const AccountsEdit = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validContent, setValidContent] = useState("");

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);
  const userAccountName = useSelector((state) => state.userAccountName);

  const changeValue = (state, setState) => {
    setIsDisabled(false);
    setState(state);
  };

  const editUserInfoBtn = async (e) => {
    e.preventDefault();
    setValidContent(``);

    let userData = { id: userId, userName, phoneNumber, email };
    const editUserInfoData = await dispatch(editUserInfo(userData));

    const { status, userInfoData } = editUserInfoData;

    if (status === 200 || status === 201) {
      alert(`${userName}님의 정보가 정상적으로 바뀌었습니다.`);
      setIsDisabled(true);
      console.log(userInfoData);
    } else {
      const errorMessage = editUserInfoData.message;
    }
  };

  const isEmail = async (text) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    console.log(text);
    if (emailRegex.test(text)) {
      const { result } = await dispatch(validationEmail(email));

      return result.code;
    }
    return false;
  };

  const isPhoneNumber = async (text) => {
    const phoneRegex = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

    if (phoneRegex.test(text)) {
      const { result } = await dispatch(validationPhoneNumber(email));

      return result.code;
    }
    return false;
  };

  useEffect(async () => {
    const getUserInfoData = await dispatch(getUserInfo(userId));
    const { status, userInfo } = getUserInfoData;

    if (status === 200 || status === 201) {
      setEmail(userInfo.email);
      setUserName(userInfo.userName);
      setPhoneNumber(userInfo.phoneNumber);
    } else {
      const errorMessage = getUserInfoData.message;
      alert(errorMessage);
    }
  }, []);

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
                <h1 className={"aedit-header-username "}>{userAccountName}</h1>
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
                    value={userName}
                    onChange={(e) => changeValue(e.target.value, setUserName)}
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
                    value={email}
                    onChange={(e) => changeValue(e.target.value, setEmail)}
                    // valueCheck={isEmail}
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
                    value={phoneNumber}
                    onChange={(e) =>
                      changeValue(e.target.value, setPhoneNumber)
                    }
                    // valueCheck={isPhoneNumber}
                  />
                </div>
              </div>
              <div className={"aedit-box-el mt-16 "}>
                <aside className={"aedit-box-el-title "}></aside>
                <div className={"aedit-box-el-content "}>
                  <p
                    aria-atomic={true}
                    className={
                      validContent.length > 0
                        ? "signin-invalid"
                        : "hide-content"
                    }
                  >
                    {validContent}
                  </p>
                </div>
              </div>
              <div className={"aedit-box-el mt-16 "}>
                <aside className={"aedit-box-el-title "}></aside>
                <div className={"aedit-box-el-content "}>
                  <button
                    className={"blue-white-btn "}
                    disabled={isDisabled}
                    onClick={editUserInfoBtn}
                  >
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
