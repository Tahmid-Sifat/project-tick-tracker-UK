# TickSight UK – React + TypeScript Project by Tahmid Al Sifat

This is my submission for the Elanco technical task for the Industrial Placement Position 2026.  
I built a clean and simple MVP-style frontend using **React + TypeScript** that visualises tick activity across the UK, provides an educational section, and allows users to report new sightings through a lightweight **Node.js backend**.

My goal was to keep the project readable, easy to run, and structured clearly, while covering core areas of the task such as mapping, UI state management, accessibility, validation, and basic backend integration.

---

## What the app does

The application contains **three main sections**, controlled through the navigation bar at the top.

---

## 1. Map

This is the primary view of the project.

It includes:

- An interactive **Leaflet map** with 15 demo tick sightings across the UK  
- **Custom tick-themed markers** coloured by severity (low, medium, high)  
- A **details panel** that updates when clicking a marker  
- A **filters sidebar** (UI only as a demo)

The demo dataset is included locally due to browser CORS limitations on the original API.

---

## 2. Education

A simple, easy-to-read page that introduces **four common UK tick species**:

- Sheep or deer tick  
- Hedgehog tick  
- Passerine tick  
- Red sheep tick  

Features include:

- A **“View image”** modal popup showing a species photo  
- A **search bar** UI (demo behaviour)  
- A **prevention tips** section  
- A clean card layout for clarity and accessibility

In a real project, this section would be backed by a richer dataset and more detailed species profiles.

---

## 3. Report a Sighting

A fully functional report form with both frontend and backend validation.

Includes:

- Client-side required field checks  
- Server-side validation via Express  
- **Success, error, and warning** messages  
- Submitting data to the backend  
- Saving reports to a JSON file

Extra logic:

If the user enters a location containing **only numbers**, the sighting is still saved, but the UI displays a **warning** encouraging the user to double-check the location.

---

## Accessibility Features

To demonstrate accessibility awareness, the project includes:

- A **text-to-speech reader toggle** in the top-right corner  
- Uses the **Web Speech API**  
- Reads out visible text from the main application  
- Click again to stop reading  
- High-contrast colour scheme and clear typography

This is intentionally kept simple for interview explanation.

---

## Web Technologies Used

### Frontend
- React (function components)
- TypeScript
- Vite
- React Leaflet + Leaflet (Carto & OpenStreetMap tile layers)
- CSS (single dark-themed App.css)

### Backend
- Node.js
- Express
- CORS
- `fs` module for JSON persistence (lightweight substitute for a database)

---

# How to run the project

## Prerequisites
Make sure you have **Node.js v18+** installed.  
npm is included automatically.

This project consists of:

- A frontend (React + Vite)
- A backend (Node + Express)

Both must be running.

---

## Step 1: Start the backend

Open a terminal:

```
cd backend
npm install
npm start
```

The backend will run at:

```
http://localhost:4000
```

Available API route:

```
POST /api/sightings
```

Sightings are saved to:

```
backend/sightings.json
```

This file is created automatically if missing.

---

## Step 2: Start the frontend

Open a **new terminal window**:

```
cd frontend
npm install
npm run dev
```

Vite will show a local development URL, usually:

```
http://localhost:5173
```

Open that address in your browser.

---

## Step 3: Using the application

Once both servers are running:

- The **Map** view displays UK tick markers and updates the details panel when clicked  
- The **Education** view provides species descriptions and image pop-ups  
- The **Report** view allows submitting new sightings (saved to the backend)  
- The **screen-reader button** reads visible text aloud  

---

If you need additional clarification or improvements such as screenshots, badges, or diagrams, feel free to ask.
