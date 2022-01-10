import {
  SAVE_TOKEN,
  LOGOUT,
  EMAIL_SIGNUP,
  SET_FOLLOW,
  REMOVE_FOLLOW,
} from "./types";

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
        userId: "",
        userFollows: [],
        userFollowing: [],
      };

    case SET_FOLLOW:
      const { follower, following } = action;
      // console.log(follower, following);

      const setFollower = state.userFollows.concat(follower);
      const setFollowing = state.userFollowing.concat(following);

      return {
        ...state,
        userFollows: setFollower,
        userFollowing: setFollowing,
      };

    case REMOVE_FOLLOW:
      const { followerId, followingId } = action;
      console.log(followingId);

      const removeFollower = state.userFollows.filter(
        (data) => data.id != followerId
      );
      const removeFollowing = state.userFollowing.filter(
        (data) => data.id != followingId
      );

      return {
        ...state,
        userFollows: removeFollower,
        userFollowing: removeFollowing,
      };

    default:
      return state;
  }
};

export default reducer;
