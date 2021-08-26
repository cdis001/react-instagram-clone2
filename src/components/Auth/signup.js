import React, { useState } from "react";
import { GrFacebook } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./index.css";
import "../../resources/button.css";
import title_logo from "../../resources/images/title_logo.png";
import InputForm from "../InputForm";

const isId = (text) => {
  const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const phoneRegex = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

  return emailRegex.test(text) || phoneRegex.test(text);
};

const isUserName = (text) => {
  // 사용자 이름. 중복 상관 x
  return true;
};

const isNickName = (text) => {
  // 사용자 닉네임(표시되는 아이디). 중복 검사 실행
  return true;
};

const isPassword = (text) => {
  //비밀번호 조건
  return true;
};

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [validContent, setValidContent] = useState("");

  const signUpBtn = (e) => {
    e.preventDefault();
    setValidContent(``);
    console.log("회원가입")

    // let userData = { name, accountName, password, email };
    // dispatch(emailSignup(userData)).then((res) => {
    //   console.log(res);
    //   const { payload } = res;

    //   if (payload.status === 200) {
    //     alert(`${name}님, instagram에 오신것을 환영합니다!`);
    //     history.push("/accounts/login");
    //   } else {
    //     const errorMessage = payload.data.message;
    //     if (!isId(name)) {
    //       setValidContent(errorMessage);
    //     }
    //   }
    // });
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (accountName.length > 0) signUpBtn();
    }
  };

  return (
    <section className={"auth-component"}>
      <div className="auth-container">
        <div className="auth-box">
          <img className="title-logo" src={title_logo} alt="title_logo" />
          <h2 className="title-text">
            친구들의 사진과 동영상을 보려면 가입하세요.
          </h2>
          <button type="submit" className="signin-btn">
            <GrFacebook
              style={{
                marginRight: 8,
                width: 16,
                height: 16,
                position: "relative",
                top: 2,
              }}
            />
            <span>Facebook으로 로그인</span>
          </button>

          <div className="line-div">
            <div className="signin-line" />
            <span className="line-span">또는</span>
            <div className="signin-line" />
          </div>

          <form className="form" method="post">
            <InputForm
              type="text"
              placeholder="이메일 주소"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              value={email}
              valueCheck={isId}
              onKeyPress={onKeyPress}
            />
            <InputForm
              type="text"
              placeholder="성명"
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="userName"
              value={name}
              valueCheck={isUserName}
              onKeyPress={onKeyPress}
            />
            <InputForm
              type="text"
              placeholder="사용자 이름"
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
              name="nickname"
              value={accountName}
              valueCheck={isNickName}
              onKeyPress={onKeyPress}
            />
            <InputForm
              type="password"
              placeholder="비밀번호"
              className="form-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              value={password}
              valueCheck={isPassword}
              onKeyPress={onKeyPress}
            />

            <button
              type="submit"
              className="signin-btn"
              disabled={
                name.length > 0 &&
                accountName.length > 0 &&
                accountName.length > 0 &&
                password.length > 5
                  ? false
                  : true
              }
              onClick={() => {}}
            >
              가입
            </button>
          </form>

          <p
            aria-atomic={true}
            className={
              validContent.length > 0 ? "signin-invalid" : "hide-content"
            }
          >
            {validContent}
          </p>
        </div>

        <div className="signup-box">
          <p className="signup-text">
            계정이 있으신가요? <Link to="/accounts/login">로그인</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
