import React, { useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import { jwtDecode } from "jwt-decode";

const useTokenValidity = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  useEffect(() => {
    if (currentUser && typeof currentUser.token === "string") {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "UPDATE_USER", payload: null });
      }
    }
  }, [currentUser]);
};

export default useTokenValidity;
