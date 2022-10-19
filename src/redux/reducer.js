import {
  SAVE_USER_INFO,
  LOGOUT,
  EMAIL_SIGNUP,
  SET_FOLLOW,
  SET_FOLLOWING,
  REMOVE_FOLLOWING,
  UPDATE_USER_INFO,
} from "./types";

const initialState = {
  token: "",
  isLogin: false,
  userId: "",
  userAccountName: "",
  userFollows: [],
  userFollowing: [],
  userProfile: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP:
      return { ...state, result: action.payload };

    case SAVE_USER_INFO:
      const { token, userAccountName, userId, userProfile } = action;
      return {
        ...state,
        isLogin: true,
        token,
        userId,
        userAccountName,
        userProfile,
      };

    case LOGOUT:
      return {
        token: "",
        isLogin: false,
        userId: "",
        userAccountName: "",
        userFollows: [],
        userFollowing: [],
      };

    case SET_FOLLOWING:
      const { newFollowing } = action;

      const setNewFollowing = state.userFollowing.concat(newFollowing);

      return {
        ...state,
        userFollowing: setNewFollowing,
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

    case REMOVE_FOLLOWING:
      const { removeFollowingId } = action;

      const removeFollowing = state.userFollowing.filter(
        (data) => data.id != removeFollowingId
      );

      return {
        ...state,
        userFollowing: removeFollowing,
      };

    default:
      return state;
  }
};

export default reducer;
