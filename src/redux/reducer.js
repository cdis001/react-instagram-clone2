import { ACCOUNT_LOGIN, EMAIL_SIGNUP, SET_FEEDS } from "./types";

const initialState = {
  token: "",
  isLogin: false,
  feeds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP:
      return { ...state, result: action.payload };

    case ACCOUNT_LOGIN:
      return { ...state, result: action.payload };

    case SET_FEEDS:
      const { feeds } = action;
      return { ...state, feeds };

    default:
      return state;
  }
};

export default reducer;
