import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addFollow, deleteFollow } from "../../redux/actions";
import "../../resources/button.css";

const FollowButton = ({ followingId, isFollowed, type }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowed);
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

  if (isFollowing) {
    return (
      <button
        onClick={onUnFollowButton}
        className={"white-black-btn " + "user-follow-btn "}
      >
        팔로잉
      </button>
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
