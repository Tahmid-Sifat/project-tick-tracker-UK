// importing React because I am writing a React component.
import React from "react";

// importing the Leaflet map pieces.
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
 
// importing Leaflet so I can create custom icons.
import L from "leaflet";

// importing my Sighting type and the static demo data. 
import type { Sighting } from "../data/sightings";
import { demoSightings } from "../data/sightings";

//  importing my own custom made three coloured tick marker images.
import tickRed from "../assets/tickRed.png";
import tickGreen from "../assets/tickGreen.png";
import tickYellow from "../assets/tickYellow.png";

// importing Leaflet's default marker assets to avoid missing-icon problems.
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// fixing the default Leaflet icon paths (this is a common Vite + Leaflet step).
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// making the approximate centre of the UK , being the initial position of leaflet map .
const ukCenter: [number, number] = [54.5, -3];

// These are the props that App passes into this component.
// communicating with the app to tell which marker user clicked 
// here , I am defining a new type called MapFaceProps 
// here onSelectSighting is a function , receving a Sighting object 
type MapFaceProps = {
  onSelectSighting: (sighting: Sighting) => void;
};

// picking the correct tick marker image for a given severity.
function getSeverityIcon(severity: Sighting["severity"]) {
  const iconUrl =
    severity === "high"
      ? tickRed
      : severity === "medium"
      ? tickYellow
      : tickGreen;

  return new L.Icon({
    iconUrl,
    iconSize: [44, 44],      // making the marker a bit larger
    iconAnchor: [22, 44],    // so the point of the tick is at the bottom
    popupAnchor: [0, -44],
    className: "tick-marker-icon",
  });
}

/* 

  In an earlier version I tried to fetch real data from the Elanco API:

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://dev-task.elancoapps.com/data/tick-sightings"
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const apiData: ApiTickSighting[] = await response.json();

        // I mapped the API data into my Sighting format here...
        // ...but browser CORS prevented me from reading the response,
        // so for this assignment I switched to a small static dataset
        // (demoSightings) to keep the UI simple and reliable.
      } catch (error) {
        console.error("Error fetching Elanco tick sightings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  Because of the CORS restriction (no Access-Control-Allow-Origin for localhost),
  I decided to use the static demoSightings array instead. This still lets me
  demonstrate the mapping, markers, and sidebar interactions without fighting
  the API from the frontend.
*/

// This is my main map component.
// It ONLY operates on the map and the tick data that I already have.

// function component called MapFace  that expects MapFaceProps as props
const MapFace: React.FC<MapFaceProps> = ({ onSelectSighting }) => {
  // For this version I simply use the 15 demoSightings from my data file.
  const sightings = demoSightings;

  return (
    <MapContainer // react-leaflet component that creates a leaflet map
      center={ukCenter}
      zoom={5.5}
      scrollWheelZoom={true} // allows the user to zoom with mouse scrollers 
      style={{ height: "100%", width: "100%" }}
    >
      {/* I use a dark base map so the bright tick markers stand out. */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* showing a marker for each sighting that I have. */}
      {sightings.map((item) => ( // this is similar to JavaScript loops 
        <Marker
          key={item.id} // React requires a key when rendering a list
          position={[item.lat, item.lng]}
          icon={getSeverityIcon(item.severity)}
          eventHandlers={{
            click: () => onSelectSighting(item),
          }}
        >
          <Popup>
            <strong>{item.species}</strong>
            <br />
            Location: {item.location}
            <br />
            Severity: {item.severity}
            <br />
            Date: {item.date}
            {item.time && <> at {item.time}</>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapFace;
