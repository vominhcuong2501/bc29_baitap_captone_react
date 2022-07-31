const DEFAULT_STATE = {
    userLogin: null
}


export const UserReducer = (state = DEFAULT_STATE, {type, payload}) => {
    switch (type) {
        default:
            return {...state}
    }
}