import { SAVE_TOKEN, LOGOUT, EMAIL_SIGNUP, SET_FEEDS } from "./types";

const initialState = {
  token: "",
  isLogin: false,
  userId: "",
  userFollows: [],
  userFollowing: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP:
      return { ...state, result: action.payload };

    case SAVE_TOKEN:
      const { token, userId } = action;
      return { ...state, isLogin: true, token, userId };

    case LOGOUT:
      return {
        token: "",
        isLogin: false,
      };

    default:
      return state;
  }
};

export default reducer;
