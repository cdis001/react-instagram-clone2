import React, { useEffect } from "react";

import "./menuBox.css";

const MenuBox = ({ menus }) => {
  return (
    <div className={"menu-component"}>
      <div className={"menu-box"}>
        {menus.map((data) => (
          <button
            key={data.id}
            className={data.buttonStyle}
            onClick={data.onClick}
            type={!!data.type ? "button" : data.type}
          >
            {data.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuBox;
