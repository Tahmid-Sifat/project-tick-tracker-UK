// I import React because this file defines a React component.
import React from "react";

// I import the main React-Leaflet map components.
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// I import the Leaflet CSS so the map looks correct.
import "leaflet/dist/leaflet.css";

// I import Leaflet itself.
import L from "leaflet";

// I import my dummy tick sighting data and the Sighting type.
import { dummySightings } from "../data/sightings";
import type { Sighting } from "../data/sightings";

// I import marker images so the default Leaflet marker works with Vite.
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import tickRed from "../assets/tickRed.png";
import tickGreen from "../assets/tickGreen.png";
import tickYellow from "../assets/tickYellow.png";



// I fix the default Leaflet marker icons so they actually show up.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// I set a simple map centre (roughly the middle of the UK).
const ukCenter: [number, number] = [54.5, -3];

// I describe what props this map component expects.
// Right now it only needs a function that runs when a marker is clicked.
type MapFaceProps = {
  onSelectSighting: (sighting: Sighting) => void;
};

// I create a small helper to make a custom tick icon.
// I place the tick image on top of a coloured circle so severity is still visible.
// I use a separate tick image for each severity.
// This is the simplest and clearest approach.
function getSeverityIcon(severity: Sighting["severity"]) {
  const iconUrl =
    severity === "high"
      ? tickRed
      : severity === "medium"
      ? tickYellow
      : tickGreen;

  return new L.Icon({
    iconUrl,
    iconSize: [44, 44],     // bigger marker
    iconAnchor: [22, 44],   // bottom center
    popupAnchor: [0, -44],  // popup above marker
    className: "tick-marker-icon"  // I add this so I can style it in CSS
  });
}



// This is the main map component I use inside App.tsx.
const MapFace: React.FC<MapFaceProps> = ({ onSelectSighting }) => {
  return (
    <MapContainer
      center={ukCenter}
      zoom={5.5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Background map tiles from OpenStreetMap */}
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>




      {/* One marker for each dummy sighting */}
      {dummySightings.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={getSeverityIcon(item.severity)}
          eventHandlers={{
            // When I click a marker, I tell the parent which sighting was selected.
            click: () => onSelectSighting(item),
          }}
        >
          <Popup>
            <strong>{item.species}</strong>
            <br />
            Severity: {item.severity}
            <br />
            {item.location}
            <br />
            {item.date} at {item.time}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapFace;
