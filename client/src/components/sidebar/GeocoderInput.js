import React, { useEffect } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useValue } from "../../context/ContextProvider";

const GeocoderInput = ({ map }) => {
  const { containerRef, dispatch } = useValue(); // Assuming useValue provides these

  useEffect(() => {
    if (!map) return; // Only proceed if the map instance is available

    // Initialize the MapboxGeocoder
    const ctrl = new MapboxGeocoder({
      marker: false,
      accessToken: process.env.REACT_APP_MAP_TOKEN,
    });

    // Append the geocoder to the container
    containerRef.current.appendChild(ctrl.onAdd(map));

    // Event listeners for the geocoder
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch({
        type: "FILTER_ADDRESS",
        payload: { lng: coords[0], lat: coords[1] },
      });
    });

    ctrl.on("clear", () => dispatch({ type: "CLEAR_ADDRESS" }));

    // Clean up on unmount
    return () => {
      // Properly remove the geocoder control
      if (containerRef?.current && ctrl.onRemove) {
        // Call the onRemove method of the geocoder to properly clean it up
        ctrl.onRemove();
      }
    };
  }, [map, containerRef, dispatch]);

  return null; // This component does not render anything itself
};

export default GeocoderInput;
