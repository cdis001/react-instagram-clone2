import axios from "axios";

import { EMAIL_SIGNUP, ACCOUNT_LOGIN, GET_FEEDS } from "./types";

const DOMAIN = "http://localhost:4000";
// axios.defaults.withCredentials = true;

export const emailSignup = (userData) => {
  const data = axios.post(DOMAIN + "/api/auth/register", userData).then(
    (res) => res,
    (error) => error.response
  );

  return { type: EMAIL_SIGNUP, payload: data };
};

export const loginRequest = (userData) => {
  const data = axios.post(DOMAIN + "/api/auth/login", userData).then(
    (res) => res,
    (error) => error.response
  );
  return { type: ACCOUNT_LOGIN, payload: data };
};

export const getFeeds = () => {
  const data = axios.get(DOMAIN + "/api/feeds").then(
    (res) => res,
    (error) => error.response
  );
  return { type: GET_FEEDS, payload: data };
};
