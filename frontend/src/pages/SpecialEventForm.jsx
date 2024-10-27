// SpecialEventForm.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./DataEntryForm.css";

const SpecialEventForm = () => {
  // Initialize today's date in YYYY-MM-DD 
  const today = new Date().toISOString().split('T')[0];

  // Set initial form 
  const [eventData, setEventData] = useState({
    eventName: '',        // Event name
    eventType: '',        // Event type
    date: today,          // Default date is today
    startTime: '',        // Start time for the event
    rideID: null,         // Foreign key: Ride ID
    parkStatusID: null,   // Foreign key: Park Status ID
    shopID: null,         // Foreign key: Shop ID
    restaurantID: null    // Foreign key: Restaurant ID
  });

  // State variables for dropdown options from the database
  const [rideOptions, setRideOptions] = useState([]);
  const [parkStatusOptions, setParkStatusOptions] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);

  // Fetch data for each foreign key dropdown on component mount
  useEffect(() => {
    // Function to fetch options for each dropdown from API endpoints
    const fetchDropdownData = async () => {
      try {
        // Ride options
        const rideResponse = await axios.get('/api/rides');
        setRideOptions(rideResponse.data.map(ride => ({
          value: ride.rideID,
          label: ride.rideName
        })));

        //  Park Status options
        const parkStatusResponse = await axios.get('/api/parkStatus');
        setParkStatusOptions(parkStatusResponse.data.map(status => ({
          value: status.parkStatusID,
          label: status.statusName
        })));

        // Shop options
        const shopResponse = await axios.get('/api/shops');
        setShopOptions(shopResponse.data.map(shop => ({
          value: shop.shopID,
          label: shop.shopName
        })));

        //  Restaurant options
        const restaurantResponse = await axios.get('/api/restaurants');
        setRestaurantOptions(restaurantResponse.data.map(restaurant => ({
          value: restaurant.restaurantID,
          label: restaurant.restaurantName
        })));

      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle dropdown selection changes
  const handleSelectChange = (selectedOption, { name }) => {
    setEventData({ ...eventData, [name]: selectedOption ? selectedOption.value : null });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log or send data to backend
    console.log("Event data submitted:", eventData);
    alert(`Event ${eventData.eventName} has been submitted successfully.`);
  };

  return (
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
          type="number"
          name="eventType"
          value={eventData.eventType}
          onChange={handleChange}
          required
        />

        {/* Event Date, defaulting to today */}
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />

        {/* Event Start Time */}
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />

        {/* Ride ID Dropdown */}
        <label>Ride:</label>
        <Select
          options={rideOptions}
          onChange={(option) => handleSelectChange(option, { name: 'rideID' })}
          placeholder="Select Ride"
          isClearable
        />

        {/* Park Status ID Dropdown */}
        <label>Park Status:</label>
        <Select
          options={parkStatusOptions}
          onChange={(option) => handleSelectChange(option, { name: 'parkStatusID' })}
          placeholder="Select Park Status"
          isClearable
        />

        {/* Shop ID Dropdown */}
        <label>Shop:</label>
        <Select
          options={shopOptions}
          onChange={(option) => handleSelectChange(option, { name: 'shopID' })}
          placeholder="Select Shop"
          isClearable
        />

        {/* Restaurant ID Dropdown */}
        <label>Restaurant:</label>
        <Select
          options={restaurantOptions}
          onChange={(option) => handleSelectChange(option, { name: 'restaurantID' })}
          placeholder="Select Restaurant"
          isClearable
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SpecialEventForm;
