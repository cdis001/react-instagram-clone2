import axios from "axios";

import {
  EMAIL_SIGNUP,
  ACCOUNT_LOGIN,
} from "./types";

const DOMAIN = "http://localhost:4000";
// axios.defaults.withCredentials = true;

export const emailSignup = (userData) => {
  const data = axios.post(DOMAIN + "/api/auth/register", userData).then(
    (res) => res,
    (error) => error.response
  );

  return { type: EMAIL_SIGNUP, payload: data };
};

export const loginRequest = (formData) => {
  const data = axios.post(DOMAIN + "/accounts/login", formData).then(
    (res) => res,
    (error) => error.response
  );
  return { type: ACCOUNT_LOGIN, payload: data };
};

