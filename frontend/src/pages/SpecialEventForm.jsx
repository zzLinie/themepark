// SpecialEventForm.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./DataEntryForm.css";
import EmployeeHeader from "../components/employeeHeader";
import { useDropZone } from "react-dropzone";

const SpecialEventForm = () => {
  // Initialize today's date in YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Set initial form
  const [eventData, setEventData] = useState({
    eventName: "", // Event name
    eventType: "", // Event type
    startDate: today,
    endDate: today,
  });

  const[imageFile, setImageFile] = useState(null);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle dropdown selection changes
  const handleSelectChange = (selectedOption, { name }) => {
    setEventData({
      ...eventData,
      [name]: selectedOption ? selectedOption.value : null,
    });
  };

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };
  const {getRootProps, getInputProps} = useDropZone({onDrop});

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server API
      const response = await axios.post(
        "https://themepark-backend.onrender.com/events/create",
        eventData
      );
      alert(`Special event created with ID: ${response.data.eventID}`);

      // Reset form fields
      setEventData({
        eventName: "", // Event name
        eventType: "", // Event type
        startDate: today,
        endDate: today,
      });
    } catch (error) {
      console.error("Error creating special event:", error);
      alert("Failed to create special event. Please try again.");
    }
  };

  return (
    <>
      <EmployeeHeader />
      <div className="dataentryformcontainer">
        <h1>Add New Special Event</h1>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
            required
          />

          {/* Event Type */}
          <label>Event Type:</label>
          <input
            type="text"
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            required
          />

          {/* Event Date, defaulting to today */}
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />

          {/* Event Start Time */}
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            required
          />

          <label>Event Image:</label>
          <div {...getRootProps()} className = "dropzone">
            <input {...getInputProps()} />
            {imageFile ? (
              <p>{imageFile.name}</p>
            ) : (
              <p>Drop an image here, or click to select one</p>
            )}
          </div>
          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default SpecialEventForm;
