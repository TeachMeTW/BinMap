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

    // Assuming containerRef is a ref to the DOM element where you want to render the geocoder
    if (containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0]);
    }
    containerRef.current.appendChild(ctrl.onAdd(map)); // Add the geocoder to the container

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
      if (containerRef?.current) {
        containerRef.current.removeChild(ctrl.onRemove());
      }
    };
  }, [map, containerRef, dispatch]);

  return null; // This component does not render anything itself
};

export default GeocoderInput;
