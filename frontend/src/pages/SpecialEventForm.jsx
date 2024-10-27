import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataEntryForm.css';

const SpecialEventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: '',
    eventDate: '',
    startTime: '',
    rideID: '',
    parkStatusID: '',
    shopID: '',
    restaurantsID: ''
  });
  
  const [rides, setRides] = useState([]);
  const [parkStatuses, setParkStatuses] = useState([]);
  const [giftShops, setGiftShops] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch dropdown data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rideRes = await axios.get('http://localhost:5000/rides');
        setRides(rideRes.data);
        
        const parkStatusRes = await axios.get('http://localhost:5000/parkstatuses');
        setParkStatuses(parkStatusRes.data);
        
        const giftShopRes = await axios.get('http://localhost:5000/giftshops');
        setGiftShops(giftShopRes.data);
        
        const restaurantRes = await axios.get('http://localhost:5000/restaurants');
        setRestaurants(restaurantRes.data);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/specialevents', eventData);
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="dataentryformcontainer">
      <h1>Add New Special Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={handleChange}
          required
        />

        <label>Event Type:</label>
        <input
          type="number"
          name="eventType"
          value={eventData.eventType}
          onChange={handleChange}
          required
        />

        <label>Event Date:</label>
        <input
          type="date"
          name="eventDate"
          value={eventData.eventDate}
          onChange={handleChange}
          required
        />

        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />

        {/* Dropdown for Ride ID */}
        <label>Ride:</label>
        <select name="rideID" value={eventData.rideID} onChange={handleChange}>
          <option value="">Select Ride</option>
          {rides.map(ride => (
            <option key={ride.rideID} value={ride.rideID}>
              {ride.rideName}
            </option>
          ))}
        </select>

        {/* Dropdown for Park Status ID */}
        <label>Park Status:</label>
        <select name="parkStatusID" value={eventData.parkStatusID} onChange={handleChange}>
          <option value="">Select Park Status</option>
          {parkStatuses.map(status => (
            <option key={status.parkStatusID} value={status.parkStatusID}>
              {status.statusName}
            </option>
          ))}
        </select>

        {/* Dropdown for Shop ID */}
        <label>Gift Shop:</label>
        <select name="shopID" value={eventData.shopID} onChange={handleChange}>
          <option value="">Select Gift Shop</option>
          {giftShops.map(shop => (
            <option key={shop.shopID} value={shop.shopID}>
              {shop.shopName}
            </option>
          ))}
        </select>

        {/* Dropdown for Restaurant ID */}
        <label>Restaurant:</label>
        <select name="restaurantsID" value={eventData.restaurantsID} onChange={handleChange}>
          <option value="">Select Restaurant</option>
          {restaurants.map(restaurant => (
            <option key={restaurant.restaurantID} value={restaurant.restaurantID}>
              {restaurant.restaurantName}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SpecialEventForm;
