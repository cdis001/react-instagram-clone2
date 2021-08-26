import React, { useState } from "react";
import { GrFacebook } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./index.css";
import "../../resources/button.css";
import title_logo from "../../resources/images/title_logo.png";
import InputForm from "../InputForm";

const LoginForm = () => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");

  const signinBtn = (e) => {
    // const formData = new FormData();
    // formData.append("accountName", accountName);
    // formData.append("password", password);

    // dispatch(loginRequest(formData)).then((res) => {
    //   const { payload } = res;
    //   // console.log(res.payload);

    //   if (payload.status === 200) {
    //     localStorage.setItem("accountName", accountName);
    //     history.push("/");
    //   } else if (payload.status === 401) {
    //     setValidContent(
    //       "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요."
    //     );
    //   }
    // });
    console.log("로그인");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (accountName.length > 0) signinBtn();
    }
  };

  return (
    <div>
      <div className="auth-box">
        <img className="title-logo" src={title_logo} alt="title_logo" />
        <form className="form" method="post">
          <div className="login-box">
            <InputForm
              type="text"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
              name="username"
              value={accountName}
              onKeyPress={onKeyPress}
            />
            <InputForm
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              value={password}
              onKeyPress={onKeyPress}
            />

            <button
              type="submit"
              className="signin-btn"
              disabled={
                accountName.length > 0 && password.length > 5 ? false : true
              }
              onClick={signinBtn}
            >
              로그인
            </button>

            <div className="line-div">
              <div className="signin-line" />
              <span className="line-span">또는</span>
              <div className="signin-line" />
            </div>

            <button className="fb-btn" onClick={(e) => e.preventDefault()}>
              <GrFacebook style={{ marginRight: 8, width: 16, height: 16 }} />
              <span>Facebook으로 로그인</span>
            </button>
          </div>

          <Link className="forgotLink" to="/accounts/password/reset">
            비밀번호를 잊으셨나요?
          </Link>
        </form>
      </div>

      <div className="signup-box">
        <p className="signup-text">
          계정이 없으신가요? <Link to="/accounts/emailsignup">가입하기</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
