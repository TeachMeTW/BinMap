// Receive the state and action
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
      };

    case "OPEN_LOGIN":
      return {
        ...state,
        openLogin: true,
      };

    case "CLOSE_LOGIN":
      return {
        ...state,
        openLogin: false,
      };

    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "END_LOADING":
      return {
        ...state,
        loading: false,
      };

    case "UPDATE_ALERT":
      return {
        ...state,
        alert: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
