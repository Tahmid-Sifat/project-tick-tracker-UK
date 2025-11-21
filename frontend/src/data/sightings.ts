// I define the possible severity levels.
export type Severity = "low" | "medium" | "high";

// This is the shape of one tick sighting in my app.
export type Sighting = { // so creating a typescript type named Sighting 
  id: number;
  lat: number;
  lng: number;
  species: string;
  date: string;
  time: string;
  severity: Severity;
  location: string;
};

// I keep a simple static dataset here.
// These 15 sightings cover major UK cities so the map feels lively.
export const demoSightings: Sighting[] = [
  {
    id: 1,
    lat: 51.5074,
    lng: -0.1278,
    location: "London",
    species: "Southern rodent tick",
    date: "2025-08-14",
    time: "17:30",
    severity: "high",
  },
  {
    id: 2,
    lat: 53.4808,
    lng: -2.2426,
    location: "Manchester",
    species: "Marsh tick",
    date: "2025-08-05",
    time: "12:15",
    severity: "medium",
  },
  {
    id: 3,
    lat: 55.9533,
    lng: -3.1883,
    location: "Edinburgh",
    species: "Sheep tick",
    date: "2025-07-20",
    time: "09:45",
    severity: "low",
  },
  {
    id: 4,
    lat: 55.8642,
    lng: -4.2518,
    location: "Glasgow",
    species: "Dog tick",
    date: "2025-08-10",
    time: "15:10",
    severity: "medium",
  },
  {
    id: 5,
    lat: 53.4084,
    lng: -2.9916,
    location: "Liverpool",
    species: "Marsh tick",
    date: "2025-07-29",
    time: "10:20",
    severity: "low",
  },
  {
    id: 6,
    lat: 52.4862,
    lng: -1.8904,
    location: "Birmingham",
    species: "Hedgehog tick",
    date: "2025-08-16",
    time: "14:05",
    severity: "high",
  },
  {
    id: 7,
    lat: 53.8008,
    lng: -1.5491,
    location: "Leeds",
    species: "Bird tick",
    date: "2025-08-01",
    time: "08:50",
    severity: "medium",
  },
  {
    id: 8,
    lat: 51.4816,
    lng: -3.1791,
    location: "Cardiff",
    species: "Sheep tick",
    date: "2025-07-25",
    time: "11:40",
    severity: "low",
  },
  {
    id: 9,
    lat: 51.4545,
    lng: -2.5879,
    location: "Bristol",
    species: "Southern rodent tick",
    date: "2025-08-12",
    time: "13:10",
    severity: "medium",
  },
  {
    id: 10,
    lat: 54.9783,
    lng: -1.6174,
    location: "Newcastle",
    species: "Hedgehog tick",
    date: "2025-07-30",
    time: "16:55",
    severity: "low",
  },
  {
    id: 11,
    lat: 52.9548,
    lng: -1.1581,
    location: "Nottingham",
    species: "Dog tick",
    date: "2025-08-03",
    time: "09:20",
    severity: "medium",
  },
  {
    id: 12,
    lat: 53.3811,
    lng: -1.4701,
    location: "Sheffield",
    species: "Marsh tick",
    date: "2025-08-14",
    time: "18:40",
    severity: "high",
  },
  {
    id: 13,
    lat: 50.9097,
    lng: -1.4044,
    location: "Southampton",
    species: "Bird tick",
    date: "2025-08-07",
    time: "07:55",
    severity: "low",
  },
  {
    id: 14,
    lat: 52.6369,
    lng: -1.1398,
    location: "Leicester",
    species: "Sheep tick",
    date: "2025-08-02",
    time: "10:05",
    severity: "medium",
  },
  {
    id: 15,
    lat: 54.5973,
    lng: -5.9301,
    location: "Belfast",
    species: "Hedgehog tick",
    date: "2025-08-11",
    time: "14:45",
    severity: "high",
  },
];
