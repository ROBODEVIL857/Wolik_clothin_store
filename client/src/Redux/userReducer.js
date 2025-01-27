import actionTypes from "./constants";

const initialState = {
    users: [],
    user: [],
    updateUser: [],
    searchUsers: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case actionTypes.SEARCH_USER:
            return {
                ...state,
                searchUsers: state.users.filter( user => 
                    user.firstName.toLowerCase().includes(action.payload.searchText.toLowerCase()) || 
                    user.lastName.toLowerCase().includes(action.payload.searchText.toLowerCase()) ||
                    user.email.toLowerCase().includes(action.payload.searchText.toLowerCase()) )
            }
        case actionTypes.GET_ME:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload
            }

        default:
            return state
    }
}

export { userReducer };