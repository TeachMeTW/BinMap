import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_SERVER_URL + "/bin";

export const createBin = async (bin, currentUser, dispatch, setPage) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: bin, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: { open: true, severity: "success", message: "Bin was added" },
    });
    dispatch({ type: "RESET_BIN" });
    setPage(0);
  }

  dispatch({ type: "END_LOADING" });
};

export const getBins = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_BINS", payload: result });
    dispatch({
      type: "FILTER_TYPE",
      payload: { recycle: true, trash: true, compost: true, multi: true },
    });
  }
};
