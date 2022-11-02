import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MenuBox from "../MenuBox";
import "../../resources/button.css";
import "./editNav.css";

const EditNavEl = ({ id, location, title }) => {
  const pathname = window.location.pathname;
  return (
    <li key={id}>
      <Link to={location}>
        <div
          className={`edit-nav-title ${
            location === pathname ? "nav-title-active" : null
          }`}
        >
          {title}
        </div>
      </Link>
    </li>
  );
};

const EditNav = () => {
  const menuList = [
    { id: 1, location: "/accounts/edit", title: "프로필 편집" },
    { id: 2, location: "/accounts/password/edit", title: "비밀번호 변경" },
  ];

  return (
    <ul className={"edit-nav-ul "}>
      {menuList.map((data) => (
        <EditNavEl {...data} />
      ))}
    </ul>
  );
};

export default EditNav;
