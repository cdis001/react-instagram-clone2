import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addFollow, deleteFollow } from "../../redux/actions";
import MenuBox from "../MenuBox";
import "../../resources/button.css";

const FollowButton = ({ followingId, isFollowed, type }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const [isUnFollowingOn, setIsUnFollowingOn] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const onFollowButton = async () => {
    const followData = { followerId: userId, followingId };
    const result = await dispatch(addFollow(followData));

    const { status } = result;
    // console.log(result);

    if (status === 200 || status === 201) {
      setIsFollowing(true);
    } else {
      alert(result.message);
      setIsFollowing(true);
    }
  };

  const onUnFollowButton = async () => {
    const followData = { followerId: userId, followingId };
    const result = await dispatch(deleteFollow(followData));

    const { status } = result;
    // console.log(result);

    if (status === 200 || status === 201) {
      setIsFollowing(false);
    } else {
      alert(result.message);
      setIsFollowing(false);
    }
  };
  const menus = [
    {
      id: 1,
      title: `팔로우를 취소하시겠어요?`,
      buttonStyle: "menu-title",
    },
    {
      id: 2,
      title: "팔로우 취소",
      onClick: onUnFollowButton,
      buttonStyle: "menu-red-b",
    },
    {
      id: 3,
      title: "취소",
      onClick: () => setIsUnFollowingOn(false),
    },
  ];

  if (isFollowing) {
    return (
      <div>
        {isUnFollowingOn ? <MenuBox menus={menus} /> : null}
        <button
          onClick={() => setIsUnFollowingOn(!isUnFollowingOn)}
          className={"white-black-btn " + "user-follow-btn "}
        >
          팔로잉
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={onFollowButton}
        className={"white-blue-btn " + "user-follow-btn "}
      >
        팔로우
      </button>
    );
  }
};

export default FollowButton;
