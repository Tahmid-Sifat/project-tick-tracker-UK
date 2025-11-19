// I import React's useState so I can remember which sighting is selected
// and which page (Map / Education / Report) is active.
import { useState } from "react";

// I import the main stylesheet.
import "./App.css";

// I import my map component.
import MapFace from "./components/MapFace";

// I import the Sighting type.
import type { Sighting } from "./data/sightings";

// I import the simple education section.
import EducationSection from "./components/EducationSection";

import ReportForm from "./components/ReportForm";

import logoT from "./assets/logoT.png";



// I describe what kind of values I allow for the current page.
type Page = "map" | "education" | "report";

function App() {
  // Selected sighting for the details panel.
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(
    null
  );

  // Current page: "map" by default.
  const [currentPage, setCurrentPage] = useState<Page>("map");

  // When the user clicks "Report a Sighting" (on the right panel),
  // I switch to the report page. I will add the form later.
  const handleReportClick = () => {
    setCurrentPage("report");
    const element = document.getElementById("report-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // When the user clicks "Get Directions", I open Google Maps for that point.
  const handleDirectionsClick = () => {
    if (!selectedSighting) return;
    const url = `https://www.google.com/maps?q=${selectedSighting.lat},${selectedSighting.lng}`;
    window.open(url, "_blank");
  };

  // When the user clicks "Share", I just show a simple alert for now.
  const handleShareClick = () => {
    if (!selectedSighting) return;
    const message = `Tick sighting in ${selectedSighting.location} on ${selectedSighting.date}`;
    alert(`Sharing this sighting:\n\n${message}`);
  };

  // I create a helper to set the page and also clear the selected sighting
  // when I leave the map view.
  const handleChangePage = (page: Page) => {
    setCurrentPage(page);
    if (page !== "map") {
      setSelectedSighting(null);
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-title">
         <img src={logoT} alt="TickSight Logo" className="logo-img" />
          <h1 className="brand-name">TickSight UK</h1>
          <span className="brand-subtitle">Elanco Task</span>
        </div>

        {/* These buttons switch between the simple "pages". */}
        <nav className="nav-buttons">
          <button
            className={`nav-button ${currentPage === "map" ? "active" : ""}`}
            onClick={() => handleChangePage("map")}
          >
            Map
          </button>
          <button
            className={`nav-button ${
              currentPage === "education" ? "active" : ""
            }`}
            onClick={() => handleChangePage("education")}
          >
            Education
          </button>
          <button
            className={`nav-button ${
              currentPage === "report" ? "active" : ""
            }`}
            onClick={() => handleChangePage("report")}
          >
            Report
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT: I choose what to show based on currentPage. */}
      {currentPage === "map" && (
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


          {/* MIDDLE PANEL: Map */}
          <section className="map-section">
            <header className="map-section-header">
              <div>
                <h2>UK Tick Activity</h2>
                <p className="muted">
                  Interactive tick sightings across the UK.
                </p>
              </div>

              {/* Simple text legend for marker colours */}
              <div className="legend">
                <span className="legend-dot low"></span> Low
                <span className="legend-dot medium"></span> Medium
                <span className="legend-dot high"></span> High
              </div>
            </header>

            {/* The map fills this wrapper. */}
            <div className="map-wrapper">
              <MapFace onSelectSighting={setSelectedSighting} />
            </div>
          </section>

          {/* RIGHT PANEL: Sighting details */}
          <aside className="side-panel right-panel">
            <h2>Sighting Details</h2>

            {/* If no sighting is selected yet, I show a simple message. */}
            {!selectedSighting && (
              <>
                <p className="muted">
                  When I click a marker on the map, I will show the details
                  here.
                </p>

                <div className="placeholder-box">
                  <p className="muted small">No sighting selected yet.</p>
                </div>
              </>
            )}

            {/* If a sighting is selected, I display its details. */}
            {selectedSighting && (
              <>
                <p className="muted">
                  This is the sighting I clicked on the map.
                </p>

                <div className="placeholder-box">
                  <p className="small">
                    <strong>Species:</strong> {selectedSighting.species}
                  </p>
                  <p className="small">
                    <strong>Severity:</strong> {selectedSighting.severity}
                  </p>
                  <p className="small">
                    <strong>Date &amp; time:</strong>{" "}
                    {selectedSighting.date} at {selectedSighting.time}
                  </p>
                  <p className="small">
                    <strong>Location:</strong> {selectedSighting.location}
                  </p>
                </div>
              </>
            )}

            {/* Quick actions */}
            <div className="actions">
              <button className="primary-button" onClick={handleReportClick}>
                Report a Sighting
              </button>
              <button
                className="secondary-button"
                onClick={handleDirectionsClick}
                disabled={!selectedSighting}
              >
                Get Directions
              </button>
              <button
                className="secondary-button"
                onClick={handleShareClick}
                disabled={!selectedSighting}
              >
                Share
              </button>
            </div>
          </aside>
        </main>
      )}

      {currentPage === "education" && (
        <main className="simple-page-wrapper">
          <EducationSection />
        </main>
      )}

  {currentPage === "report" && (
  <main className="simple-page-wrapper" id="report-section">
    <div className="simple-page">
      <ReportForm />
    </div>
  </main>
)}

    </div>
  );
}

export default App;
