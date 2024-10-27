// src/components/RideForm.js
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./DataEntryForm.css";
import EmployeeHeader from "../components/employeeHeader";

const RideForm = () => {
  const [rideData, setRideData] = useState({
    rideName: "",
    lastMain: "",
    maintenanceStatus: true,
    rideCount: 0,
    capacity: 1,
    dailyMaintenance: 0,
    specialEvents: [],
    operatingHoursStart: "",
    operatingHoursEnd: "",
  });

  const eventOptions = [
    { value: 1, label: "Event 1" },
    { value: 2, label: "Event 2" },
    { value: 3, label: "Event 3" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData({ ...rideData, [name]: value });
  };

  const handleStatusChange = (e) => {
    setRideData({ ...rideData, maintenanceStatus: e.target.checked });
  };

  const handleSelectChange = (selectedOptions) => {
    setRideData({
      ...rideData,
      specialEvents: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/rides",
        rideData
      );
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <EmployeeHeader />
      <div className="dataentryformcontainer">
        <h1>Add New Ride</h1>
        <form onSubmit={handleSubmit}>
          <label>Ride Name:</label>
          <input
            type="text"
            name="rideName"
            value={rideData.rideName}
            onChange={handleChange}
            required
          />

          <label>Last Maintenance Date:</label>
          <input
            type="date"
            name="lastMain"
            value={rideData.lastMain}
            onChange={handleChange}
            required
          />

          <label>Maintenance Status (Active):</label>
          <input
            type="checkbox"
            name="maintenanceStatus"
            checked={rideData.maintenanceStatus}
            onChange={handleStatusChange}
          />

          <label>Ride Count:</label>
          <input
            type="number"
            name="rideCount"
            min="0"
            value={rideData.rideCount}
            onChange={handleChange}
            required
          />

          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={rideData.capacity}
            onChange={handleChange}
            required
          />

          <label>Daily Maintenance:</label>
          <input
            type="number"
            name="dailyMaintenance"
            min="0"
            value={rideData.dailyMaintenance}
            onChange={handleChange}
            required
          />

          <label>Special Events:</label>
          <Select
            isMulti
            options={eventOptions}
            onChange={handleSelectChange}
          />

          <label>Operating Hours Start:</label>
          <input
            type="time"
            name="operatingHoursStart"
            value={rideData.operatingHoursStart}
            onChange={handleChange}
            required
          />

          <label>Operating Hours End:</label>
          <input
            type="time"
            name="operatingHoursEnd"
            value={rideData.operatingHoursEnd}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default RideForm;
