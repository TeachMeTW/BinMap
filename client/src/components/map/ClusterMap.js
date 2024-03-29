import React, { useEffect, useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { getBins } from "../../actions/bin";
import ReactMapGL, { Marker } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";
import { Paper, Tooltip } from "@mui/material";
import recylceImage from "../../recycle.png";
import trashImage from "../../trash.png";
import multiImage from "../../multi.png";
import compostImage from "../../compost.png";
import GeocoderInput from "../sidebar/GeocoderInput";

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const typeToImageMap = {
  recycle: recylceImage,
  compost: compostImage,
  trash: trashImage,
  multi: multiImage,
};

const ClusterMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef();
  const {
    state: { filteredBins },
    dispatch,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getBins(dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log("Filtered Bins:", filteredBins);
  }, [filteredBins]);

  useEffect(() => {
    const mappedPoints = filteredBins.map((bin) => ({
      type: "Feature",
      properties: {
        cluster: false,
        binId: bin._id,
        type: bin.type,
        images: bin.images,
        title: bin.title,
        uPhoto: bin.uPhoto,
        uName: bin.uName,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(bin.lng), parseFloat(bin.lat)],
      },
    }));
    setPoints(mappedPoints);
    console.log("Mapped Points:", mappedPoints); // Debugging log
  }, [filteredBins]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        initialViewState={{
          latitude: 35.30461564549085,
          longitude: -120.66269072457567,
          zoom: 5,
        }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        onLoad={(event) => setMapInstance(event.target)} // Set map instance on load
      >
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          const binType = cluster.properties.type;
          console.log("Bin Type:", binType); // Debugging log
          const imageSrc = typeToImageMap[binType];
          console.log("Image Source:", imageSrc); // Debugging log

          return (
            <Marker
              key={`bin-${cluster.properties.binId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={`${cluster.properties.title}`}>
                <Paper
                  component="img"
                  src={imageSrc}
                  elevation={2}
                  style={{ width: 40, height: 40 }} // Adjust size as needed
                />
              </Tooltip>
            </Marker>
          );
        })}
        <GeocoderInput map={mapInstance} />
      </ReactMapGL>
    </div>
  );
};

export default ClusterMap;
