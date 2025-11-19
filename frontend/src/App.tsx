// I import React and useState because I need simple view + selection state.
import React, { useState } from "react";

// I import my main stylesheet for the layout.
import "./App.css";

// I import the components that make up the different parts of the UI.
import MapFace from "./components/MapFace";
import EducationSection from "./components/EducationSection";
import ReportForm from "./components/ReportForm";

// I import the logo image.
import logoT from "./assets/logoT.png";

// I import the Sighting type so I can type the selected sighting.
import type { Sighting } from "./data/sightings";

// I describe the possible "views" or tabs in this app.
type View = "map" | "education" | "report";

// This is my main App component.
// It only handles layout, navigation, and which view is shown.
const App: React.FC = () => {
  // I store which view/tab is currently active.
  const [activeView, setActiveView] = useState<View>("map");

  // I store which sighting is selected on the map (for the right-hand details panel).
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(
    null
  );

  // When the user clicks a marker, the map calls this function.
  const handleSelectSighting = (sighting: Sighting) => {
    setSelectedSighting(sighting);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-title">
          <img src={logoT} alt="TickSight logo" className="brand-logo" />
          <h1 className="brand-name">TickSight UK</h1>
          <span className="brand-subtitle">Elanco Task</span>
        </div>

        {/* Simple navigation between Map / Education / Report */}
        <nav className="nav-buttons">
          <button
            className={`nav-button ${activeView === "map" ? "active" : ""}`}
            onClick={() => setActiveView("map")}
          >
            Map
          </button>
          <button
            className={`nav-button ${
              activeView === "education" ? "active" : ""
            }`}
            onClick={() => setActiveView("education")}
          >
            Education
          </button>
          <button
            className={`nav-button ${
              activeView === "report" ? "active" : ""
            }`}
            onClick={() => setActiveView("report")}
          >
            Report
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT: I show different content depending on the active view. */}

      {/* 1) MAP VIEW */}
      {activeView === "map" && (
        <main className="content-layout">

         {/* LEFT PANEL: simple demo filters (no real logic yet) */}
<aside className="side-panel left-panel">
  <h2>Filters</h2>
  <p className="muted small">
    These filters are just a demo for now. In a real app they would change
    which sightings appear on the map.
  </p>

  {/* Date range filter */}
  <div className="filter-section">
    <h3 className="filter-title">Date</h3>
    <div className="filter-group filter-dates">
      <label>
        <span>From</span>
        <input type="date" />
      </label>
      <label>
        <span>To</span>
        <input type="date" />
      </label>
    </div>
  </div>

  {/* Severity filter as simple chips */}
  <div className="filter-section">
    <h3 className="filter-title">Severity</h3>
    <div className="chip-row">
      <button type="button" className="chip chip-low">
        Low
      </button>
      <button type="button" className="chip chip-medium">
        Medium
      </button>
      <button type="button" className="chip chip-high">
        High
      </button>
    </div>
  </div>

  {/* Species checkboxes */}
  <div className="filter-section">
    <h3 className="filter-title">Species</h3>
    <div className="filter-group">
      <label className="checkbox-row">
        <input type="checkbox" /> <span>Tick A</span>
      </label>
      <label className="checkbox-row">
        <input type="checkbox" /> <span>Tick B</span>
      </label>
      <label className="checkbox-row">
        <input type="checkbox" /> <span>Tick C</span>
      </label>
    </div>
  </div>

  {/* Reset button at the bottom */}
  <button type="button" className="secondary-button filter-reset">
    Reset filters
  </button>
</aside>

          {/* CENTER: map section */}
          <section className="map-section">
            <header className="map-section-header">
              <div>
                <h2>UK Tick Activity</h2>
                <p className="muted">
                  Interactive tick sightings across the UK.
                </p>
              </div>

              {/* Simple legend to explain marker colours */}
              <div className="legend">
                <span className="legend-dot low"></span> Low
                <span className="legend-dot medium"></span> Medium
                <span className="legend-dot high"></span> High
              </div>
            </header>

            {/* The actual map lives in this wrapper. */}
            <div className="map-wrapper">
              <MapFace onSelectSighting={handleSelectSighting} />
            </div>
          </section>

          {/* RIGHT PANEL: details about the currently selected sighting */}
          <aside className="side-panel right-panel">
            <h2>Sighting Details</h2>
            <p className="muted">
              When I click a marker on the map, I show the details here.
            </p>

            {selectedSighting ? (
              <div className="placeholder-box">
                <p className="muted small">
                  <strong>Species:</strong> {selectedSighting.species}
                </p>
                <p className="muted small">
                  <strong>Location:</strong> {selectedSighting.location}
                </p>
                <p className="muted small">
                  <strong>Date:</strong> {selectedSighting.date}
                  {selectedSighting.time && ` at ${selectedSighting.time}`}
                </p>
                <p className="muted small">
                  <strong>Severity:</strong> {selectedSighting.severity}
                </p>
              </div>
            ) : (
              <div className="placeholder-box">
                <p className="muted small">No sighting selected yet.</p>
              </div>
            )}

            {/* Quick action buttons */}
            <div className="actions">
              <button
                className="primary-button"
                onClick={() => setActiveView("report")}
              >
                Report a Sighting
              </button>
              <button className="secondary-button">Get Directions</button>
              <button className="secondary-button">Share</button>
            </div>
          </aside>
        </main>
      )}

      {/* 2) EDUCATION VIEW */}
      {activeView === "education" && (
        <div className="simple-page-wrapper">
          <div className="simple-page">
            <EducationSection />
          </div>
        </div>
      )}

      {/* 3) REPORT VIEW */}
      {activeView === "report" && (
        <div className="simple-page-wrapper">
          <div className="simple-page">
            <h2>Report a Sighting</h2>
            <p className="muted">
              I use this form to collect key information about a new sighting.
            </p>
            <ReportForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
