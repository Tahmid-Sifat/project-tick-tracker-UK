TickSight UK – React + TypeScript Project by Tahmid Al Sifat
------------------------------------------------------------

This is my submission for the Elanco technical task for the industrial placement position 2026. I built a frontend for MVP using React + TypeScript application that shows tick activity across the UK, lets users explore a simple education page, and allows reporting a new sighting through a lightweight Node.js backend.

My goal was to keep the project clean, readable, and easy to run, while still touching on the main areas of the task: mapping, UI/state management, validation, and basic server interaction.

What the app does :

The app has three main sections, controlled through simple top-level navigation:

1. Map

This is the main view of the project.
It includes:

An interactive Leaflet map with demo tick sightings (15 locations across the UK)

Coloured customized tick-themed markers for severity (low, medium, high)

A right-side panel that shows details when you click a marker

A left filter section (UI only), showing how filtering would work in a real system

2. Education

A simple page where I list four common UK tick species , later it will be connected with more enriched database of tick species :

Sheep or deer tick

Hedgehog tick

Passerine tick

Red sheep tick

Each species has a “View image” button which opens a modal with a photo and a short description.
I also added a small search bar (currently a placeholder) to show how species search could work in the future.
This section also include prevention guidelines.

3. Report

A form where users can report a new sighting.
This part includes:

Frontend validation

Backend validation

Status messages (success, error, warning)

A JSON-file backed Express API that stores submitted sightings

I also added a small extra logic piece:
If the location is only numbers (e.g. “12345”), I still save the sighting but show a warning, since a location normally contains text.

Accessibility features : 

As a simple accessibility demo, I added a text-to-speech screen reader toggle in the header.
Clicking the icon:

Reads out the visible text on the page

Clicking again stops the reading

Works using the built-in Web Speech API

A clear visual design with high contrast.

Web Technologies I used 
-------------------------

For Frontend : 

React (modern function component style)

TypeScript

Vite

React Leaflet + Leaflet ( Tile layer and theme from openStreetMap and Carto)

CSS with a custom dark theme

For Backend : 

Node.js

Express

CORS

File system API (fs) for lightweight JSON persistence


Prerequisites:
You need Node.js installed (version 18 or higher recommended). npm comes with Node, so no separate installation is required.
This project has two parts:

A frontend (React + Vite)

A backend (Node + Express)
Both need to be running.

Step 1: Start the backend

Open a terminal.

Navigate into the backend folder:
cd backend

Install backend dependencies:
npm install

Start the backend server:
npm start

The backend will run at:
http://localhost:4000

It exposes a single API endpoint:
POST /api/sightings

Sightings are saved in:
backend/sightings.json
This file is created automatically if it does not exist.

Step 2: Start the frontend

Open a second terminal window.

Navigate into the frontend folder:
cd frontend

Install frontend dependencies:
npm install

Start the Vite development server:
npm run dev

Vite will start and display a local URL, usually:
http://localhost:5173

Open that address in your browser.

Step 3: Using the application
Once both servers are running:

The Map view shows demo tick sightings across the UK.

Clicking a marker shows details in the right-hand panel.

The Education view shows four species with descriptions and image popups.

The Report view lets you submit a new tick sighting to the backend.

The screen-reader button in the header reads out the visible page text.


