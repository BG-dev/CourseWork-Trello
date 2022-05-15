const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    if(action.type === 'SET_USER'){
        return {
            ...state,
            user: action.user
        };
    }
    return state;
}

export default userReducer