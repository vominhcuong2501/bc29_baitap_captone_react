import { USER_INFO_KEY } from "../../constans/common";
import { SET_USER_INFO } from "../Types/user.type";

// store reducer
let userInfo = localStorage.getItem(USER_INFO_KEY);
if (userInfo) {
  userInfo = JSON.parse(userInfo);
}

const DEFAULT_STATE = {
  userInfo: userInfo,
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO: {
      state.userInfo = payload;
      console.log(payload);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
