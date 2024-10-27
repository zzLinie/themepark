// src/components/TicketForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './DataEntryForm.css';

const TicketForm = () => {
  const [ticketData, setTicketData] = useState({
    customerID: '',
    ticketType: '',
    priceID: '',
    startDate: '',
    expiryDate: '',
    ticketAvailability: 0
  });
  const [priceOptions, setPriceOptions] = useState([]);

  // Fetch ticket prices for dropdown
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ticket-prices');
        const formattedOptions = response.data.map((price) => ({
          value: price.priceID,
          label: `${
            price.ticketType === 0 ? 'Children' : price.ticketType === 1 ? 'Adult' : 'Senior'
          } - $${price.ticketPrice}`
        }));
        setPriceOptions(formattedOptions);
      } catch (err) {
        console.error("Error fetching ticket prices:", err);
      }
    };
    fetchPrices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setTicketData({ ...ticketData, priceID: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tickets', ticketData);
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="dataentryformcontainer">
      <h1>Add New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <label>Customer ID:</label>
        <input
          type="number"
          name="customerID"
          value={ticketData.customerID}
          onChange={handleChange}
          required
        />

        <label>Ticket Type & Price:</label>
        <Select
          options={priceOptions}
          onChange={handleSelectChange}
          required
        />

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={ticketData.startDate}
          onChange={handleChange}
          required
        />

        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={ticketData.expiryDate}
          onChange={handleChange}
          required
        />

        <label>Ticket Availability:</label>
        <input
          type="number"
          name="ticketAvailability"
          value={ticketData.ticketAvailability}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
