import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { addFeed } from "../../redux/actions";
import "../../resources/button.css";
import "./FeedAddForm.css";

const FeedAddForm = ({ setIsFeedAddFormShow }) => {
  const [contents, setContents] = useState("");
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const _feedAddBtn = async () => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("contents", contents);
    formData.append("userId", userId);

    const result = await dispatch(addFeed(formData));

    if (result.status === 200 || result.status === 201) {
      setIsFeedAddFormShow(false);
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="feedAddForm-component">
      <div className="feedAddForm-cancelBtn">
        <button onClick={() => setIsFeedAddFormShow(false)}>✕</button>
      </div>
      <div className="feedAddForm-contentBox">
        <div className="feedAddForm-contentBox-header">
          <div />
          <h1>새 게시물 만들기</h1>
          {file === null ? (
            <div />
          ) : (
            <div>
              <button className="white-blue-btn" onClick={_feedAddBtn}>
                {" "}
                게시하기
              </button>
            </div>
          )}
        </div>
        <div className="feedAddForm-contentBox-content">
          {file === null ? (
            <>
              <FontAwesomeIcon
                icon={faPhotoVideo}
                className={"feedAddForm-photoIcon "}
              />
              <h2>사진과 동영상을 선택하세요</h2>
            </>
          ) : (
            <img
              className="feedAddForm-previewImg"
              src={previewImg}
              alt={"img-file"}
            />
          )}
          <input
            type="file"
            // multiple
            id="file-upload"
            className="display-none"
            accept={"image/jpg, image/png, image/jpeg"}
            onChange={(e) => {
              e.preventDefault();

              let targetFile = e.target.files[0] || null;
              if (targetFile !== null) {
                let reader = new FileReader();
                reader.onloadend = () => {
                  setFile(targetFile);
                  setPreviewImg(reader.result);
                };
                reader.readAsDataURL(targetFile);
              } else {
                setFile(null);
              }
            }}
          />

          <label
            className="blue-white-btn file-upload-btn"
            htmlFor="file-upload"
          >
            파일 선택
          </label>

          {file === null ? null : (
            <textarea
              className="feedAddForm-setContent"
              placeholder={"문구 입력..."}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedAddForm;
