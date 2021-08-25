import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const InputForm = ({
  type = "text",
  boxStyle = "",
  placeholder,
  placeholderStyle,
  onChange,
  name,
  value,
  valueCheck,
  disabled,
  onKeyPress,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHide, setIsHide] = useState(type === "password");
  const [inputType, setInputType] = useState(type);
  const [isSignup, setIsSignup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={"form-box " + (isFocus ? "focus-div " : "") + boxStyle}>
      <label className="form-label ">
        <span
          className={
            "form-placeholder " +
            (value.length > 0 ? "placeholder-up " : "") +
            placeholderStyle
          }
        >
          {placeholder}
        </span>
        <input
          type={inputType}
          className={"label-input " + (value.length > 0 ? "focus-input " : "")}
          onChange={onChange}
          onFocus={() => {
            setIsFocus(!isFocus);
            setIsSignup(false);
          }}
          onBlur={() => {
            setIsFocus(!isFocus);
            if (valueCheck !== undefined) {
              setIsSignup(true);
              setIsChecked(valueCheck(value));
            }
          }}
          onKeyPress={onKeyPress}
          name={name}
          value={value}
          disabled={disabled}
        />
      </label>
      {isSignup && value.length > 0 ? (
        // <img
        //   src={isChecked ? check_mark : x_mark}
        //   alt="x_mark"
        //   className="input-mark "
        // />
        isChecked ? (
          <FontAwesomeIcon icon={faCheckCircle} />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} />
        )
      ) : null}

      {type === "password" && value.length > 0 ? (
        <button
          className={
            "password-btn " + (isHide ? "show-password " : "hide-password ")
          }
          onClick={(e) => {
            e.preventDefault();
            setIsHide(!isHide);
            setInputType(isHide ? "text" : "password");
          }}
        >
          {isHide ? `비밀번호 표시` : `숨기기`}
        </button>
      ) : null}
    </div>
  );
};

export default InputForm;
