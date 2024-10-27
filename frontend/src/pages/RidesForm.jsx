// RideForm.js
import React, { useState } from 'react';
import "./DataEntryForm.css";

const RideForm = () => {
  // Initialize the form state with an empty capacity field
  const [rideData, setRideData] = useState({
    rideName: '',       // Name of the ride
    capacity: '',       // Capacity, initialized as an empty string to be blank
    operatingStart: '', // Start time for operating hours
    operatingEnd: ''    // End time for operating hours
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData({ ...rideData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that end time is after start time
    if (rideData.operatingEnd <= rideData.operatingStart) {
      alert("Operating end time must be after start time.");
      return;
    }

    // Log and alert the submitted ride data
    console.log("Ride data submitted:", rideData);
    alert(`Ride ${rideData.rideName} has been submitted successfully.`);
  };

  return (
    <div className="dataentryformcontainer">
      <h1>Add New Ride</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Ride Name */}
        <label>Ride Name:</label>
        <input
          type="text"
          name="rideName"
          value={rideData.rideName}
          onChange={handleChange}
          required
        />

        {/* Capacity, positive integer */}
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          min="1"
          value={rideData.capacity}
          onChange={handleChange}
          required
        />

        {/* Operating Hours - Start Time */}
        <label>Operating Start Time:</label>
        <input
          type="time"
          name="operatingStart"
          value={rideData.operatingStart}
          onChange={handleChange}
          required
        />

        {/* Operating Hours - End Time, must be after start time */}
        <label>Operating End Time:</label>
        <input
          type="time"
          name="operatingEnd"
          value={rideData.operatingEnd}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RideForm;
