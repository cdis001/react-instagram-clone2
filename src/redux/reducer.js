import { ACCOUNT_LOGIN, EMAIL_SIGNUP, GET_FEEDS } from "./types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP:
      return { ...state, result: action.payload };

    case ACCOUNT_LOGIN:
      return { ...state, result: action.payload };

    case GET_FEEDS:
      return { ...state, result: action.payload };

    default:
      return state;
  }
};

export default reducer;
