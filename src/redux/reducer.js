import { SAVE_TOKEN, LOGOUT, EMAIL_SIGNUP, SET_FEEDS } from "./types";

const initialState = {
  token: "",
  isLogin: false,
  feeds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP:
      return { ...state, result: action.payload };

    case SAVE_TOKEN:
      const { token } = action;
      return { ...state, isLogin: true, token };

    case LOGOUT:
      return {
        token: "",
        isLogin: false,
      };

    case SET_FEEDS:
      const { feeds } = action;
      return { ...state, feeds };

    default:
      return state;
  }
};

export default reducer;
