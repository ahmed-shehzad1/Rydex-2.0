import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN_HERE"; // replace with your token

function MapboxRoute() {
  const [viewport, setViewport] = useState({
    longitude: 73.0479, // initial center
    latitude: 33.6844,
    zoom: 12,
  });

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Map
        {...viewport}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {/* Example marker */}
        <Marker longitude={73.0479} latitude={33.6844} />
      </Map>
    </div>
  );
}

export default MapboxRoute;

