import axios from "axios";

import { EMAIL_SIGNUP, SAVE_TOKEN, LOGOUT, SET_FEEDS } from "./types";

const DOMAIN = "http://localhost:4000";
// axios.defaults.withCredentials = true;

const getToken = async () => await localStorage.getItem("token");

export const emailSignup = (userData) => {
  const data = axios.post(DOMAIN + "/api/auth/register", userData).then(
    (res) => res,
    (error) => error.response
  );

  return { type: EMAIL_SIGNUP, payload: data };
};

export const loginRequest = async (userData) => {
  return async (dispatch) => {
    const data = await axios.post(DOMAIN + "/api/auth/login", userData);

    // console.log(data);
    const { status } = data;

    if (status === 201) {
      const { accessToken } = data.data;
      if (accessToken) {
        dispatch(await saveToken(accessToken));
      }

      return { accessToken, status };
    } else {
      return { status };
    }

    // return { type: SAVE_TOKEN, payload: data };
  };
};

export const getFeeds = async () => {
  return async (dispatch) => {
    const result = await axios.get(DOMAIN + "/api/feeds");

    const { status, data } = result;
    if (status === 200) {
      dispatch(setFeeds(data));
    }
    return { status };
  };
};

const saveToken = async (token) => {
  await localStorage.setItem("token", token);

  return {
    type: SAVE_TOKEN,
    token,
  };
};

export const logout = async () => {
  await localStorage.setItem("token", "");
  return {
    type: LOGOUT,
  };
};

const setFeeds = (feeds) => {
  return {
    type: SET_FEEDS,
    feeds,
  };
};
