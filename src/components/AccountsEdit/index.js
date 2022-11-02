import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  editUserInfo,
  getUserInfo,
  validationEmail,
  validationPhoneNumber,
  updateProfile,
  deleteProfile,
} from "../../redux/actions";
import Header from "../Header";
import MenuBox from "../MenuBox";
import EditNav from "../EditNav";
import "../../resources/button.css";
import "./accountsEdit.css";

const AccountEditInput = ({
  title,
  placeholder,
  value,
  onChange,
  valueCheck,
}) => {
  return (
    <div className={"aedit-box-el "}>
      <aside className={"aedit-box-el-title "}>
        <label>{title}</label>
      </aside>
      <div className={"aedit-box-el-content "}>
        <input
          placeholder={title}
          type="text"
          className={"aedit-box-el-content-input "}
          value={value}
          onChange={onChange}
          valueCheck={valueCheck}
        />
      </div>
    </div>
  );
};

const AccountsEdit = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validContent, setValidContent] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [file, setFile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);
  const userAccountName = useSelector((state) => state.userAccountName);
  const userProfile = useSelector((state) => state.userProfile);

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
    } else {
      const errorMessage = editUserInfoData.message;
    }
  };

  const _deleteProfileBtn = async (e) => {
    e.preventDefault();

    const deleteProfileRequest = await dispatch(deleteProfile(userId));

    const { status } = deleteProfileRequest;

    if (status === 200 || status === 201) {
      setShowMenu(false);
      setPreviewImg("");
      alert(`${userName}님의 프로필이 삭제 되었습니다.`);
    } else {
      const errorMessage = deleteProfileRequest.message;
      alert(errorMessage);
    }
  };

  const _fileUploadInput = () => {
    const fileUploadInput = document.querySelector("#file-upload");
    fileUploadInput.click();
  };

  const _editProfileUpdateBtn = () => {
    userProfile === "" ? _fileUploadInput() : setShowMenu(true);
  };

  const _profileUploadBtn = async (e) => {
    e.preventDefault();

    let targetFile = e.target.files[0] || null;
    if (targetFile !== null) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(targetFile);

      const formData = new FormData();

      formData.append("file", targetFile);
      formData.append("userId", userId);

      const result = await dispatch(updateProfile(formData));
      setShowMenu(false);

      if (result.status === 200 || result.status === 201) {
        alert("프로필 사진이 업데이트 되었습니다.");
      } else {
        alert(result.message);
      }
    } else {
    }
  };

  const isEmail = async (text) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

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

  const menus = [
    {
      id: 1,
      title: "프로필 사진 업로드",
      onClick: _fileUploadInput,
      buttonStyle: "menu-blue-b",
      type: "submit",
    },
    {
      id: 2,
      title: "프로필 사진 삭제",
      onClick: _deleteProfileBtn,
      buttonStyle: "menu-red-b",
    },
    {
      id: 3,
      title: "취소",
      onClick: () => {
        setShowMenu(false);
      },
    },
  ];

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
      {showMenu ? <MenuBox menus={menus} /> : null}
      <Header />
      <div className={"aedit-content-container "}>
        <div className={"aedit-content-box "}>
          <EditNav />
          <article className={"aedit-box-content "}>
            <div className={"aedit-box-header "}>
              <div className={"aedit-header-left "}>
                <input
                  type="file"
                  id="file-upload"
                  className="display-none"
                  accept={"image/jpg, image/png, image/jpeg"}
                  onChange={_profileUploadBtn}
                />
                <button
                  title="프로필 사진 바꾸기"
                  onClick={_editProfileUpdateBtn}
                >
                  {previewImg === "" ? (
                    <img src={userProfile} />
                  ) : (
                    <img src={previewImg} />
                  )}
                </button>
              </div>
              <div className={"aedit-header-right "}>
                <h1 className={"aedit-header-username "}>{userAccountName}</h1>
                <button
                  className={"white-blue-btn "}
                  onClick={_editProfileUpdateBtn}
                >
                  프로필 사진 바꾸기
                </button>
              </div>
            </div>
            <form className={"aedit-box-form "} method="POST">
              <AccountEditInput
                title={"이름"}
                value={userName}
                onChange={(e) => changeValue(e.target.value, setUserName)}
              />
              <AccountEditInput
                title={"이메일"}
                value={email}
                onChange={(e) => changeValue(e.target.value, setEmail)}
                alueCheck={isEmail}
              />
              <AccountEditInput
                title={"전화번호"}
                value={phoneNumber}
                onChange={(e) => changeValue(e.target.value, setPhoneNumber)}
                valueCheck={isPhoneNumber}
              />
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
