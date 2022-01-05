import axios from "axios";

import { EMAIL_SIGNUP, SAVE_TOKEN, LOGOUT, SET_FEEDS } from "./types";

const DOMAIN = "http://localhost:4000";
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
      const data = await axios.post(DOMAIN + "/api/auth/register", userData);

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
      const data = await axios.post(DOMAIN + "/api/auth/login", userData, {
        withCreadentials: true,
      });
      // console.log(data);
      const { status } = data;
      const { id, accessToken } = data.data;
      if (accessToken) {
        dispatch(await saveToken(id, accessToken));
      }
      return { accessToken, status };
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const getFeeds = async () => {
  return async (dispatch) => {
    try {
      const result = await axios.get("/api/feeds");
      const { status, data } = result;

      if (status === 200) {
        return { status, feeds: data };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

export const validationEmail = async (email) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        DOMAIN + "/api/auth/emailValidation/" + email
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

export const validationAccountName = async (accountName) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        DOMAIN + "/api/auth/accountNameValidation/" + accountName
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
      console.log(result);

      if (status === 200 || status === 201) {
        return { status };
      }
    } catch (e) {
      const errorMessage = e.response.data;
      const { statusCode, message } = errorMessage;
      return { status: statusCode, message };
    }
  };
};

const saveToken = async (id, token) => {
  await localStorage.setItem("token", token);

  return {
    type: SAVE_TOKEN,
    token,
    userId: id,
  };
};

export const logout = async () => {
  await localStorage.setItem("token", "");
  return {
    type: LOGOUT,
  };
};

// const setFeeds = (feeds) => {
//   return {
//     type: SET_FEEDS,
//     feeds,
//   };
// };
