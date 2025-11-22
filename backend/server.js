// importing express so I can create a small web server
const express = require("express");

// importing cors so my React app on another port is allowed to talk to this server.
const cors = require("cors");

// importing the built-in fs module so I can read and write my JSON "database" file.
const fs = require("fs");
const path = require("path");

// I create my express app so that it becomes my express server 
const app = express();

// choosing a port for this backend.
const PORT = 4000;

// combining the path to my sightings.json file.
const DATA_FILE = path.join(__dirname, "sightings.json");

// telling express that I expect JSON in request bodies and I want to allow CORS.
app.use(cors());
app.use(express.json());

// adding  a tiny test route so I can check if the server is working.
app.get("/", (req, res) => {
  res.send("Tick backend is running.");
});

// creating a helper function to read all sightings from the JSON file.
function readSightings() {
  // this function tries to read the file. If it fails because the file is missing, 
  // I just return an empty array.
  try {
    const fileContents = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File does not exist yet, so I start with an empty list.
      return [];
    }
    // Any other error I pass upwards.
    throw error;
  }
}

//  another  helper function to save the full list of sightings back to the JSON file.
function writeSightings(allSightings) {
  const json = JSON.stringify(allSightings, null, 2);
  fs.writeFileSync(DATA_FILE, json, "utf8");
}

// creating my main POST endpoint that the React form will call.
app.post("/api/sightings", (req, res) => {
  //pulling the fields required about from the body.
  const { date, time, location, species, severity } = req.body;

  // I do a very simple validation on the backend.
  const errors = {};

  if (!date) errors.date = "Date is required.";
  if (!time) errors.time = "Time is required.";
  if (!location || !location.trim())
    errors.location = "Location is required.";
  if (!species) errors.species = "Species is required.";
  if (!severity) errors.severity = "Severity is required.";

  // If I found any errors, I send back a 400 with an error status.
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed on the server.",
      errors: errors,
    });
  }

  // If validation passes, I create a simple sighting object.
  const newSighting = {
    // I use the current time as a very simple unique id.
    id: Date.now(),
    date,
    time,
    location: location.trim(),
    species,
    severity,
  };

  try {
    // reading the existing sightings from the file and saving it on allSightngs 
    const allSightings = readSightings();

    // I add the new sighting to the end of the array 
    allSightings.push(newSighting);

    // saving the updated array back to the file
    writeSightings(allSightings);

    // I send a simple success response back to the frontend.
    return res.json({
      status: "success",
      message: "Your sighting has been saved.",
      sighting: newSighting,
    });
  } catch (error) {
    console.error("Error writing to sightings.json:", error);

    // If anything goes wrong while reading or writing the file, I send a server error.

    return res.status(500).json({
      status: "error",
      message: "Server error while saving your sighting.",
    });
  }
});

// starting the server using the express app i created at the beginning 

app.listen(PORT, () => {
  console.log(`Tick backend listening on http://localhost:${PORT}`);
});
