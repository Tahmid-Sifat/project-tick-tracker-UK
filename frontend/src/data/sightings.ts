// This file contains simple dummy tick sighting data.
// I use this so I can build the map and features before connecting the real API.

// I describe what one sighting looks like.
// I keep it very small and human-friendly.
export interface Sighting {
  id: number;
  lat: number;
  lng: number;
  species: string;
  severity: "low" | "medium" | "high";
  date: string;    // e.g. "2024-02-12"
  time: string;    // e.g. "14:30"
  location: string; // e.g. "Manchester"
}

// I create a small list of example sightings.
// Only 5 items so it stays simple.
export const dummySightings: Sighting[] = [
  {
    id: 1,
    lat: 53.4808,
    lng: -2.2426,
    species: "Tick A",
    severity: "low",
    date: "2024-02-20",
    time: "10:15",
    location: "Manchester"
  },
  {
    id: 2,
    lat: 51.5074,
    lng: -0.1278,
    species: "Tick B",
    severity: "medium",
    date: "2024-02-18",
    time: "12:40",
    location: "London"
  },
  {
    id: 3,
    lat: 55.9533,
    lng: -3.1883,
    species: "Tick C",
    severity: "high",
    date: "2024-02-19",
    time: "08:50",
    location: "Edinburgh"
  },
  {
    id: 4,
    lat: 52.4862,
    lng: -1.8904,
    species: "Tick D",
    severity: "low",
    date: "2024-02-17",
    time: "09:20",
    location: "Birmingham"
  },
  {
    id: 5,
    lat: 53.4084,
    lng: -2.9916,
    species: "Tick A",
    severity: "medium",
    date: "2024-02-21",
    time: "11:05",
    location: "Liverpool"
  }
];
