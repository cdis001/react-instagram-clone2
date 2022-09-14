import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { addLike, deleteLike, getLike } from "../../redux/actions";

const FeedComment = ({ id, contents, user }) => {
  const [myLike, setMyLike] = useState([]);
  const [feedCommentLikeObj, setFeedCommentLikeObj] = useState([]);
  const [myCommentLike, setMyCommentLike] = useState([]);
  const [isCommentLike, setIsCommentLike] = useState(false);

  const { userName } = user;
  const commentContents = contents;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const _addLikes = async () => {
    const addLikesData = { commentId: id, userId };
    const {
      data: commentLikeData,
      status,
      message,
    } = await dispatch(addLike(addLikesData));
    if (status === 200 || status === 201) {
      console.log(commentLikeData);
      setMyCommentLike(commentLikeData);
      setIsCommentLike(!isCommentLike);
    } else {
      alert(message);
    }
  };

  const _deleteLikes = async () => {
    const deleteLikesData = { id: myCommentLike.id, userId };
    const { data: commentDeleteLikeData, status } = await dispatch(
      deleteLike(deleteLikesData)
    );
    if (status === 200 || status === 201) {
      setMyCommentLike([]);
      setIsCommentLike(!isCommentLike);
    } else {
      alert("좋아요 삭제 실패");
    }
  };

  useEffect(async () => {
    const likeData = { target: "comment", id };
    const { data, status } = await dispatch(getLike(likeData));
    const myLikesObj = data.filter((d) => d.user.id === userId);

    if (data.length !== 0) {
      setIsCommentLike(true);
      setMyCommentLike(...myLikesObj);
    }
  }, []);
  return (
    <div className={"feed-comment-component"}>
      <h3>{userName}</h3>
      <p>&nbsp;{commentContents}</p>
      <button onClick={isCommentLike ? _deleteLikes : _addLikes}>
        <FontAwesomeIcon
          icon={isCommentLike ? solid.faHeart : faHeart}
          className={"feed-comment-icon "}
        />
      </button>
    </div>
  );
};

export default FeedComment;
