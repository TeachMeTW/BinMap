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

    case "FILTER_TYPE":
      return {
        ...state,
        // Removed the priceFilter line as it seems irrelevant here
        filteredBins: applyFilter(
          state.bins, // Use state.bins instead of state.rooms
          state.addressFilter,
          action.payload
        ),
      };

    case "FILTER_ADDRESS":
      return {
        ...state,
        addressFilter: action.payload,
        filteredBins: applyFilter(
          state.bins, // Use state.bins instead of state.rooms
          action.payload,
          state.typeFilter
        ),
      };
    case "CLEAR_ADDRESS":
      return {
        ...state,
        addressFilter: null,
        filteredBins: state.bins,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;

const applyFilter = (bins, address, typeFilter) => {
  let filteredBins = bins;

  // Filter based on address
  if (address) {
    const { lng, lat } = address;
    filteredBins = filteredBins.filter((bin) => {
      const lngDifference = Math.abs(lng - bin.lng);
      const latDifference = Math.abs(lat - bin.lat);
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  // Filter based on type
  if (typeFilter) {
    filteredBins = filteredBins.filter((bin) => typeFilter[bin.type]);
  }

  return filteredBins;
};
