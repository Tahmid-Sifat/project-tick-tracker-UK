const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory "database"
let sightings = [];

// Test route
app.get('/', (req, res) => {
  res.send('Tick Tracker Backend is running');
});

// Get all sightings
app.get('/api/sightings', (req, res) => {
  res.json(sightings);
});

// Create new sighting
app.post('/api/sightings', (req, res) => {
  const newSighting = {
    id: Date.now(),
    ...req.body,
  };
  sightings.push(newSighting);
  res.status(201).json(newSighting);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
