export default (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESSFUL":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGIN_FAILED":
            return {
                ...state,
                error: action.payload
            };
        case "REGISTER_SUCCESSFUL":
            return {
                ...state,
                user: action.payload,
            };
        case "REGISTER_FAILED":
            return {
                ...state,
                error: action.payload
            }
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}