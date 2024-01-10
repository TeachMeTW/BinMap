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

    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, action.payload] };

    case "UPDATE_DETAILS":
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      };

    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };

    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case "RESET_BIN":
      return {
        ...state,
        images: [],
        details: { title: "", description: "" },
        location: { lng: 0, lat: 0 },
      };

    case "UPDATE_BINS":
      return { ...state, bins: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
