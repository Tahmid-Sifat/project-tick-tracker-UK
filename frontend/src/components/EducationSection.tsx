import React, { useState } from "react";

// importing the four species images from the assets folder.
import sheepTick from "../assets/sheepTick.jpg";
import hedgeTick from "../assets/hedgeTick.jpg";
import passerTick from "../assets/passerTick.jpg";
import deerTick from "../assets/deerTick.jpg";

type SpeciesInfo = { // defining a typescript type which will contain SpeciesInfo 
  id: string;
  name: string;
  description: string;
  image: string;
};
// purpose of creating this type is for better error validation 

// putting species data in a small array so it is easy to map over.
const speciesList: SpeciesInfo[] = [ // using the type I declared 
  {
    id: "sheep-deer",
    name: "Sheep or deer tick",
    description:
      "Most common in grassy areas, parks, woodland, and heathland; primary vector for Lyme disease in the UK.",
    image: sheepTick,
  },
  {
    id: "hedgehog",
    name: "Hedgehog tick",
    description:
      "Frequently found on hedgehogs in gardens and urban parks; rarely bites humans but is widespread.",
    image: hedgeTick,
  },
  {
    id: "passerine",
    name: "Passerine tick",
    description:
      "Mostly associated with woodland birds, particularly passerines (songbirds); occasionally found in urban settings.",
    image: passerTick,
  },
  {
    id: "red-sheep",
    name: "Red sheep tick",
    description:
      "Found on sheep and horses in Southern England and South Wales; lives in meadows and open pastures.",
    image: deerTick,
  },
];

// This component is a simple education page.
// I keep it small so it is easy to explain in the interview.
const EducationSection: React.FC = () => {
  // I store which species image is currently being shown in the popup.
  const [activeSpecies, setActiveSpecies] = useState<SpeciesInfo | null>(null);

  return (
    <div className="simple-page">
      <section className="simple-card">
        <h2>Tick species (basic guide)</h2>
        <p className="muted">
          This is a very small example guide. In a real product this would link
          to richer content from Elanco.
        </p>
        
  {/* Simple species search (demo - not functional yet) */}
    <div className="species-search-box">
        <input
          type="text"
          className="species-search-input"
          placeholder="Search species... ( demo for now )"
         />
    </div>


        <ul className="simple-list">
          {speciesList.map((species) => (
            <li key={species.id}>
              <strong>{species.name}</strong> – {species.description}
              <button
                type="button"
                className="secondary-button species-view-button"
                onClick={() => setActiveSpecies(species)}
              >
                View image
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="simple-card">
        <h2>Prevention tips (summary)</h2>

        <ul className="simple-list">
          <li>
            Check pets and people after walks, especially around the head and
            legs.
          </li>
          <li>Use vet-recommended tick protection products where appropriate.</li>
          <li>
            Stick to clear paths when walking in tall grass or dense vegetation.
          </li>
          <li>
            Wear long sleeves and trousers in high-risk areas if possible.
          </li>
          <li>Remove ticks carefully with a proper tick removal tool.</li>
        </ul>
      </section>

      {/* Simple image popup for the selected species */}
      {activeSpecies && (
        <div
          className="tick-modal-backdrop"
          onClick={() => setActiveSpecies(null)}
        >
          <div
            className="tick-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="tick-modal-title">{activeSpecies.name}</h3>
            <p className="muted tick-modal-description">
              {activeSpecies.description}
            </p>
            <div className="tick-modal-image-wrapper">
              <img
                src={activeSpecies.image}
                alt={activeSpecies.name}
                className="tick-modal-image"
              />
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => setActiveSpecies(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
