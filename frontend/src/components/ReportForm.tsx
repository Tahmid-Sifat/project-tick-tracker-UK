import React, { useState } from "react";

// describing the shape of the form data by creating a new type .
type FormData = {
  date: string;
  time: string;
  location: string;
  species: string;
  severity: string;
};

// keeping the error messages like one optional string per field
type FormErrors = Partial<Record<keyof FormData, string>>;

//  the possible status types for my status box.
type StatusType = "success" | "error" | "warning" | null;

// This is the main "Report a sighting" form as react function component 
const ReportForm: React.FC = () => {
  // storing the current form values here , using useState Hook
  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    location: "",
    species: "",
    severity: "",
  });

  // I store validation errors here.
  const [errors, setErrors] = useState<FormErrors>({});

  //  simple status message so the user gets feedback.
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);

  // update a single field when the user types or selects a value.
  // basically telling ts that the event comes from either text input/dropdown select
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> 
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous, // using spread syntax to keep existing fields  
      [name]: value,
    }));

    // When the user fixes a field, I remove its error message.
    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  //   I am doing a very simple validation before submitting 

  const validate = (): boolean => { // declaring a function that will return boolean
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

  // handling the submit event for the form and send data to my backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // I stop the default browser submit.

    // clearing any previous status  from the useState hook
    setStatusMessage(null);
    setStatusType(null);

    const isValid = validate(); // calling the validation function  

    if (!isValid) {
      // If my own validation fails, I show an error status.
      setStatusType("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      // sending the form data to my backend as JSON.
      // making the HTTP request by using fetch 
      // await is basically making the function pause temporarily till fetch request is done
      const response = await fetch("http://localhost:4000/api/sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // telling the server that json is being sent
        body: JSON.stringify(formData), // converting the object into JSON string
      });

      // I try to read the JSON response from the server ( that I got using fetch )
      const data = await response.json();

      // If the server sends a non-OK status or an error status, I treat it as an error.
      if (!response.ok || data.status === "error") {
        // If the server sent back field errors, I merge them into my errors state.
        if (data.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors })); // using state updater function
        } // here ...prev is gathering all existing errors 

        setStatusType("error");
        setStatusMessage(
          data.message || "Something went wrong while saving your sighting."
        );
        return;
      }

      // At this point, the backend saved the sighting successfully.
      // Now I decide if this is a success or a warning message.

      // I check if the location looks unsual : only digits and spaces instead of letters
      const locationLooksNumericOnly = /^[0-9\s]+$/.test( // using regex for digits 
        formData.location.trim()
      );

      if (locationLooksNumericOnly) {
        // If the location is only numbers, I still save it
        // but I show a warning so the user can double-check.
        setStatusType("warning");
        setStatusMessage(
          "Your sighting has been saved, but the location looks unusual (only numbers). Please double-check it."
        );
      } else if (formData.severity === "high") {
        // If the severity is high, I show a success state
        // and make it clear that this is a high-alert sighting.
        setStatusType("success");
        setStatusMessage(
          "Success: your sighting has been saved. This is marked as a HIGH ALERT (high severity) sighting."
        );
      } else {
        // For normal cases I show a simple success message.
        setStatusType("success");
        setStatusMessage("Thank you, your sighting has been recorded.");
      }

      // resetting the form so it feels fresh after submitting.
      setFormData({
        date: "",
        time: "",
        location: "",
        species: "",
        severity: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Network error while submitting sighting:", error);

      // If the fetch itself fails (server down, etc.), I show a generic error.
      setStatusType("error");
      setStatusMessage(
        "Network error while saving your sighting. Please try again."
      );
    }
  };

  return (
    <section className="simple-card">
      <h2>Report a sighting</h2>
      <p className="muted">
        This is a simple demo form. This form sends the data to the backend and
        store it in a small JSON file.
      </p>

      {/* I show a small status message above the form. */}
      {statusMessage && ( // using conditional rendering again 
        <div
          className={`status-box ${
            statusType === "success"
              ? "status-success"
              : statusType === "warning"
              ? "status-warning"
              : "status-error"
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
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}
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
            <option value="Sheep or deer tick">Sheep or deer tick</option>
            <option value="Hedgehog tick">Hedgehog tick</option>
            <option value="Passerine tick">Passerine tick</option>
            <option value="Red sheep tick">Red sheep tick</option>
            
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
