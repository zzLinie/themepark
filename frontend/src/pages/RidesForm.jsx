import { useState } from "react";
import axios from "axios";
import EmployeeHeader from "../components/employeeHeader";

const RideForm = () => {
  // Form state to hold ride data
  const [formData, setFormData] = useState({
    rideName: "",
    capacity: "",
    start: "",
    end: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data with axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server API
      const response = await axios.post(
        "https://themepark-backend.onrender.com/rides/create",
        formData
      );
      alert(`Ride created with ID: ${response.data.rideID}`);

      // Reset form fields
      setFormData({
        rideName: "",
        capacity: "",
        start: "",
        end: "",
      });
    } catch (error) {
      console.error("Error creating ride:", error);
      alert("Failed to create ride. Please try again.");
    }
  };

  return (
    <>
      <EmployeeHeader />
      <div className="dataentryformcontainer">
        <h1>Add New Ride</h1>
        <form onSubmit={handleSubmit}>
          {/* Ride Name Input */}
          <label>Ride Name:</label>
          <input
            type="text"
            name="rideName"
            value={formData.rideName}
            onChange={handleChange}
            required
          />

          {/* Capacity Input */}
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />

          {/* Start Time Input */}
          <label>Start Time:</label>
          <input
            type="time"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />

          {/* End Time Input */}
          <label>End Time:</label>
          <input
            type="time"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default RideForm;
