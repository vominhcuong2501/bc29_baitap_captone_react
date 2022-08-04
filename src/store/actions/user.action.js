import { SET_USER_INFO } from "../Types/user.type"

// hành động gửi lên reducer
export const setUserAction = (data) => {
    return {
        type: SET_USER_INFO,
        payload: data
    }
}