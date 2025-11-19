// This component is a simple education page.
// I keep it small so it is easy to explain in the interview.
const EducationSection: React.FC = () => {
  return (
    <div className="simple-page">
      <section className="simple-card">
        <h2>Tick species (basic guide)</h2>
        <p className="muted">
          This is a very small example guide. In a real product this would link
          to richer content from Elanco.
        </p>

        <ul className="simple-list">
          <li>
            <strong>Tick A</strong> – example species often found in grassy
            areas and parks.
          </li>
          <li>
            <strong>Tick B</strong> – example species more common in woodland
            and shaded areas.
          </li>
          <li>
            <strong>Tick C</strong> – example species that may carry a higher
            disease risk.
          </li>
        </ul>
      </section>

      <section className="simple-card">
        <h2>Prevention tips (summary)</h2>

        <ul className="simple-list">
          <li>Check pets and people after walks, especially around the head and legs.</li>
          <li>Use vet-recommended tick protection products where appropriate.</li>
          <li>Stick to clear paths when walking in tall grass or dense vegetation.</li>
          <li>Wear long sleeves and trousers in high-risk areas if possible.</li>
          <li>Remove ticks carefully with a proper tick removal tool.</li>
        </ul>
      </section>
    </div>
  );
};

export default EducationSection;
