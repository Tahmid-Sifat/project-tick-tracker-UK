import React, { useState } from "react";

// I describe the shape of the form data so it is easy to reason about.
type FormData = {
  date: string;
  time: string;
  location: string;
  species: string;
  severity: string;
};

// I keep the error messages simple: one optional string per field.
type FormErrors = Partial<Record<keyof FormData, string>>;

// This is the main "Report a sighting" form.
const ReportForm: React.FC = () => {
  // I store the current form values here.
  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    location: "",
    species: "",
    severity: "",
  });

  // I store validation errors here.
  const [errors, setErrors] = useState<FormErrors>({});

  // I store a simple status message so the user gets feedback.
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

  // I update a single field when the user types or selects a value.
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // When the user fixes a field, I remove its error message.
    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  // I run a very simple validation before submitting.
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) newErrors.date = "Please choose a date.";
    if (!formData.time) newErrors.time = "Please choose a time.";
    if (!formData.location.trim())
      newErrors.location = "Please enter a location.";
    if (!formData.species) newErrors.species = "Please select a species.";
    if (!formData.severity) newErrors.severity = "Please select a severity.";

    setErrors(newErrors);

    // If there is at least one key in newErrors, validation failed.
    return Object.keys(newErrors).length === 0;
  };

  // I handle the submit event for the form.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // I stop the default browser submit.

    const isValid = validate();

    if (!isValid) {
      setStatusType("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    // In a real app, I would send this data to my backend API here.
    // For this demo I simply log it to the console.
    console.log("Submitted sighting (demo only):", formData);

    setStatusType("success");
    setStatusMessage("Thank you, your sighting has been recorded (demo only).");

    // I reset the form so it feels fresh after submitting.
    setFormData({
      date: "",
      time: "",
      location: "",
      species: "",
      severity: "",
    });

    setErrors({});
  };

  return (
    <section className="simple-card">
      <h2>Report a sighting</h2>
      <p className="muted">
        This is a simple demo form. In a real system this would send data to a
        backend and store it in a database.
      </p>

      {/* I show a small status message above the form. */}
      {statusMessage && (
        <div
          className={`status-box ${
            statusType === "success" ? "status-success" : "status-error"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form className="report-form" onSubmit={handleSubmit} noValidate>
        {/* DATE + TIME */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <p className="error-text">{errors.time}</p>}
          </div>
        </div>

        {/* LOCATION */}
        <div className="form-field">
          <label htmlFor="location">Location (town, park, or area)</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Manchester city park"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error-text">{errors.location}</p>}
        </div>

        {/* SPECIES */}
        <div className="form-field">
          <label htmlFor="species">Species</label>
          <select
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
          >
            <option value="">Select species</option>
            <option value="Tick A">Tick A</option>
            <option value="Tick B">Tick B</option>
            <option value="Tick C">Tick C</option>
          </select>
          {errors.species && <p className="error-text">{errors.species}</p>}
        </div>

        {/* SEVERITY */}
        <div className="form-field">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="">Select severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.severity && <p className="error-text">{errors.severity}</p>}
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="primary-button">
          Submit sighting
        </button>
      </form>
    </section>
  );
};

export default ReportForm;
