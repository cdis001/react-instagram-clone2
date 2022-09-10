import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./feed.css";
import MenuBox from "../MenuBox";
import FeedHeader from "./FeedHeader";
import FeedActions from "./FeedActions";
import FeedContents from "./FeedContents";
import DetailFeedContents from "./DetailFeedContents";
import FeedCommentBox from "./FeedCommentBox";
import { addComment } from "../../redux/actions";

const Feed = ({
  id,
  user,
  contents,
  location,
  files,
  comments,
  likes,
  type = "default",
}) => {
  const [feedComments, setFeedComments] = useState(comments);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const feedId = id;
  const { userName, id: feedOwnerId } = user;
  const feedContents = contents;
  const feedLocation = location;
  const feedImg = files[0];
  const commentCnt = feedComments.length;
  const likeCnt = likes.length;
  const detailType = type === "detail" ? "detail-feed-" : null;
  const isDetail = type === "detail";
  const isFeedOwner = userId === feedOwnerId;

  const _onCommentAdd = async () => {
    const commentData = {
      userId,
      feedId,
      contents: commentText,
    };

    const { status, comment } = await dispatch(addComment(commentData));

    if (status === 200 || status === 201) {
      setFeedComments([...feedComments, comment]);
      setCommentText("");
    } else {
      alert("댓글 등록 실패");
    }
  };

  return (
    <article
      className={`feed-article ${isDetail ? " detail-feed-article" : ""}`}
    >
      {isDetail ? null : (
        <FeedHeader
          feedId={feedId}
          userName={userName}
          feedLocation={feedLocation}
          isFeedOwner={isFeedOwner}
          isDetail={isDetail}
        />
      )}
      <div className={`${isDetail ? "detail-feed-photo-div" : ""}`}>
        <img
          className={`feed-photo ${isDetail ? " detail-feed-photo" : ""}`}
          // src={feedImg}
          src={`http://www.astronomer.rocks/news/photo/201802/82361_623_1441.jpeg`}
          sizes={"614px"}
          alt={"feedImg"}
        />
      </div>
      <div className={`${isDetail ? "detail-feed-activate-box" : ""}`}>
        {isDetail ? (
          <FeedHeader
            feedId={feedId}
            userName={userName}
            feedLocation={feedLocation}
            isFeedOwner={isFeedOwner}
            isDetail={isDetail}
          />
        ) : null}
        <div className={`${isDetail ? "detail-feed-activate" : ""}`}>
          {isDetail ? (
            <>
              <DetailFeedContents
                key={id}
                userName={userName}
                feedContents={feedContents}
                feedComments={feedComments}
                setFeedComments={setFeedComments}
              />
              <FeedActions />
              <h3
                className={"font-size-14 margin-b-8 margin-t-8 padding-h-16"}
              >{`좋아요 ${likeCnt}개`}</h3>
              <p className={"datetime padding-h-16"}>3일전</p>
            </>
          ) : (
            <>
              <FeedActions />
              <FeedContents
                likeCnt={likeCnt}
                userName={userName}
                feedContents={feedContents}
                commentCnt={commentCnt}
                feedComments={feedComments}
                isDetail={isDetail}
              />
            </>
          )}
          <FeedCommentBox
            isDetail={isDetail}
            commentText={commentText}
            setCommentText={setCommentText}
            _onCommentAdd={_onCommentAdd}
          />
        </div>
      </div>
    </article>
  );
};

export default Feed;
