import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addFollow } from "../../redux/actions";
import "../../resources/button.css";

const FollowButton = ({ followingId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const onFollowButton = async () => {
    const followData = { followerId: userId, followingId };
    const result = await dispatch(addFollow(followData));

    console.log(result);
  };
  return (
    <button
      onClick={onFollowButton}
      className={"white-blue-btn " + "user-follow-btn "}
    >
      팔로우
    </button>
  );
};

export default FollowButton;
