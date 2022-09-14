import axios from "axios";

import {
  EMAIL_SIGNUP,
  SAVE_USER_INFO,
  LOGOUT,
  SET_FOLLOW,
  SET_FOLLOWING,
  REMOVE_FOLLOWING,
} from "./types";

axios.defaults.withCredentials = true;

const getToken = async () => await localStorage.getItem("token");

const getHeader = async () => {
  const token = (await getToken()) || "";
  return {
    Accept: "application/json; charset=utf-8",
    "Content-type": "application/json; charset=utf-8",
    Authorization: `Bearer ${token}`,
  };
};

export const emailSignup = async (userData) => {
  return async (dispatch) => {
    try {
      const data = await axios.post("/api/auth/register", userData);

      const { status } = data;

      return { type: EMAIL_SIGNUP, status };
    } catch (err) {
      const errorMessage = err.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const loginRequest = async (userData) => {
  return async (dispatch) => {
    try {
      const loginData = await axios.post("/api/auth/login", userData, {
        withCreadentials: true,
      });
      // console.log(loginData);
      const { status, data } = loginData;
      const { id, accessToken, accountName, follower, following } = data;
      if (accessToken) {
        dispatch(await saveUserInfo(id, accountName, accessToken));
      }
      if (follower.length > 0 || following.length > 0) {
        dispatch(await setFollow(follower, following));
      }
      return { accessToken, status };
    } catch (e) {
      // console.log(e.response);
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const validationEmail = async (email) => {
  return async (dispatch) => {
    try {
      const result = await axios.get("/api/auth/emailValidation/" + email);
      const { status, data } = result;

      if (status === 200) {
        return { status, result: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const validationAccountName = async (accountName) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        "/api/auth/accountNameValidation/" + accountName
      );
      const { status, data } = result;

      if (status === 200) {
        return { status, result: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const getFollowingUserFeeds = async (ids, index) => {
  return async (dispatch) => {
    try {
      const result = await axios.post("/api/feeds/userFeeds", {
        ids,
        index,
      });
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, feeds: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const getOneUserFeeds = async (id, index) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/feeds/user/${id}`, {
        index,
      });
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, feeds: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const getFeedByFeedId = async (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/feeds/${id}`);
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, feedData: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const addFollow = async (followData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "/api/follows",
        followData,
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );
      const { status, data } = result;
      // console.log(result);

      if (status === 200 || status === 201) {
        dispatch(await setFollowing(data));
        return { status };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      // console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const deleteFollow = async (followData) => {
  return async (dispatch) => {
    try {
      const result = await axios.delete(
        "/api/follows",
        { data: followData },
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );
      const { status, data } = result;
      const { id } = data;

      if (status === 200 || status === 201) {
        dispatch(await removeFollowing(id));
        return { status };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      // console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const getLike = async (likeData) => {
  return async (dispatch) => {
    const { target, id } = likeData;
    try {
      const result = await axios.get(`/api/likes/${target}/${id}`);
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const addLike = async (likeData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "/api/likes",
        likeData,
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );
      const { status, data } = result;
      // console.log(result);

      if (status === 200 || status === 201) {
        return { status, data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      // console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const deleteLike = async (likeData) => {
  return async (dispatch) => {
    const { id, userId } = likeData;
    try {
      const result = await axios.delete(
        `/api/likes/${id}`,
        { data: { userId } },
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, likeData: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const addFeed = async (feedData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "/api/feeds",
        feedData,
        {
          headers: {
            ...(await getHeader()),
            "Content-type": "multipart/form-data; charset=utf-8",
          },
        },
        {
          withCredentials: true,
        }
      );

      // console.log(result);
      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const deleteFeed = async (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.delete(
        `/api/feeds/${id}`,
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );

      // console.log(result);
      const { status } = result;

      if (status === 200 || status === 201) {
        return { status };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      // console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const addComment = async (commentData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `/api/comments`,
        { ...commentData },
        {
          headers: await getHeader(),
        },
        {
          withCredentials: true,
        }
      );

      const { status, data } = result;

      if (status === 200 || status === 201) {
        return { status, comment: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

export const deleteComment = async (commentId, userId) => {
  return async (dispatch) => {
    try {
      const result = await axios.delete(`/api/comments/${commentId}`, {
        data: { id: userId },
        withCredentials: true,
        headers: await getHeader(),
      });

      const { status, data } = result;
      console.log(result);

      if (status === 200 || status === 201) {
        return { status, comment: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      console.log(errorMessage);
      return { status: statusCode, message };
    }
  };
};

const saveUserInfo = async (id, accountName, token) => {
  await localStorage.setItem("token", token);

  return {
    type: SAVE_USER_INFO,
    token,
    userId: id,
    userAccountName: accountName,
  };
};

export const logout = async () => {
  await localStorage.setItem("token", "");
  return {
    type: LOGOUT,
  };
};

const setFollowing = (newFollowing) => {
  return {
    type: SET_FOLLOWING,
    newFollowing,
  };
};

const setFollow = (follower, following) => {
  return {
    type: SET_FOLLOW,
    follower,
    following,
  };
};

const removeFollowing = (removeFollowingId) => {
  return {
    type: REMOVE_FOLLOWING,
    removeFollowingId,
  };
};
