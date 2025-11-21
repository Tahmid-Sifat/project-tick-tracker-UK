//  importing React and useState because I need simple view + selection state.
import React, { useState } from "react";

// importing my main stylesheet for the layout.
import "./App.css";

// importing the components
// that make up the different parts of the UI.
import MapFace from "./components/MapFace";
import EducationSection from "./components/EducationSection";
import ReportForm from "./components/ReportForm";

// importing the logo image.
import logoT from "./assets/logoT.png";
// importing the small reader icon PNG for my accessibility toggle.
import readerIcon from "./assets/reader.PNG";


// importing the Sighting type so I can type the selected sighting.
import type { Sighting } from "./data/sightings";

// describing the possible  tabs in this app by using union type 
type View = "map" | "education" | "report";

// This is my main App component.
// It only handles layout, navigation, and which view is shown.
const App: React.FC = () => { // dot FC meaning , App is a react function component
  // for storing which view/tab is currently active.
  const [activeView, setActiveView] = useState<View>("map");

  // storing which sighting is selected on the map (for the right-hand details panel).
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(
    null
  );

  // I am storing whether the text-to-speech reader is currently reading or not.
  const [isReading, setIsReading] = useState(false);


  // When the user clicks a marker, the map calls this function.
  const handleSelectSighting = (sighting: Sighting) => {
    setSelectedSighting(sighting);
  };

  // I am toggling a simple text-to-speech "screen reader" using the Web Speech API.
  // When the user is clicking the icon:
  // - if reading is already active, I am stopping it,
  // - otherwise I am grabbing the visible app text and I am reading it out loud.
  const toggleScreenReader = () => {
    // I am checking that I am in a browser and that speechSynthesis is available.
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    // If I am already reading, I am cancelling the speech and turning the state off.
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    // I am collecting the text content from the main app container as a simple demo.
    const text =
      document.querySelector(".app-container")?.textContent ||
      document.body.textContent ||
      "";

    // If there is nothing useful to read, I am just stopping here.
    if (!text.trim()) {
      return;
    }

    // I am creating a new utterance with the collected text.
    const utterance = new SpeechSynthesisUtterance(text);

    // I am slightly slowing down the rate so the voice is easier to follow.
    utterance.rate = 0.95;

    // When the speech is ending, I am resetting the reading state.
    utterance.onend = () => {
      setIsReading(false);
    };

    // I am cancelling any previous speech and starting this new one.
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };



  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
  {/* LEFT: logo + name */}
  <div className="header-title">
    <img src={logoT} alt="TickSight logo" className="brand-logo" />
    <div>
      <h1 className="brand-name">TickSight UK</h1>
      <span className="brand-subtitle">
        Monitor tick activity across UK
      </span>
    </div>
  </div>

  {/* RIGHT: nav + accessibility icon grouped together */}
  <div className="header-right">
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

    <button
      type="button"
      className="icon-button accessibility-button"
      onClick={toggleScreenReader}
      aria-pressed={isReading}
      aria-label={isReading ? "Stop screen reader" : "Start screen reader"}
    >
      <img
        src={readerIcon}
        alt=""
        aria-hidden="true"
        className="accessibility-icon-image"
      />
    </button>
  </div>
</header>


      {/* MAIN CONTENT: Displaying different content depending on the active view. */}

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
                <h2>UK Tick Activity Map </h2>
                <p className="muted">
                  Interactive tick sightings across the UK , click on the markers for details.
                </p>
              </div>

              {/* Simple filled dots to explain marker colours , styling will be on css */}
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
              The details of the selected marker : 
            </p>

            {/* using ternary operator to validate user click */}
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
              Please report about a new sighting by using the form below .
            </p>
            <ReportForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
