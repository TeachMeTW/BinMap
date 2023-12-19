


// Receive the state and action
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        case 'OPEN_LOGIN':
            return {
                ...state,
                openLogin: true
            }

        case 'CLOSE_LOGIN':
            return {
                ...state,
                openLogin: false
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export default reducer;