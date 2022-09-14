import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { addLike, deleteLike } from "../../redux/actions";

const FeedActions = ({
  feedId,
  likesObj = [],
  setLikesObj,
  isFeedLike,
  setIsFeedLike,
  setLikeCnt,
}) => {
  const [myLike, setMyLike] = useState([]);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const _addLikes = async () => {
    const addLikesData = { feedId, userId };
    const { likeData, status } = await dispatch(addLike(addLikesData));

    if (status === 200 || status === 201) {
      setMyLike(likeData);
      isFeedLike(!isFeedLike);
      setLikesObj([...likesObj, likeData]);
    } else {
      alert("좋아요 등록 실패");
    }
  };

  const _deleteLikes = async () => {
    const deleteLikesData = { id: myLike.id, userId };
    const { likeData: data, status } = await dispatch(
      deleteLike(deleteLikesData)
    );

    if (status === 200 || status === 201) {
      const newLikesObj = likesObj.filter((data) => data.user.id !== userId);
      setMyLike([]);
      isFeedLike(!isFeedLike);
      setLikesObj(newLikesObj);
    } else {
      alert("좋아요 삭제 실패");
    }
  };

  useEffect(() => {
    const data = likesObj.filter((data) => data.user.id === userId) || null;

    setMyLike(...data);
    if (data.length !== 0) {
      setIsFeedLike(true);
    }
  }, []);

  return (
    <div className="feed-actions">
      <button onClick={isFeedLike ? _deleteLikes : _addLikes}>
        <FontAwesomeIcon
          icon={isFeedLike ? solid.faHeart : faHeart}
          className={"feed-action-icons "}
        />
      </button>
      <button>
        <FontAwesomeIcon icon={faComment} className={"feed-action-icons "} />
      </button>
      <button>
        <FontAwesomeIcon icon={faPaperPlane} className={"feed-action-icons "} />
      </button>
      <button onClick={() => console.log("123")}>
        <FontAwesomeIcon icon={faBookmark} className={"feed-action-icons "} />
      </button>
    </div>
  );
};

export default FeedActions;
