const express = require("express");
const cors = require("cors");
const db = require("../connect");
const ticketRoute = express.Router();

ticketRoute.use(cors());
ticketRoute.use(express.json());


// Route to add a new ticket
ticketRoute.post('/create', (req, res) => {
    const { ticketType, ticketPrice, startDate, expiryDate } = req.body;
  
    // Basic validation
    if (ticketType === undefined || !startDate || !expiryDate) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    // Define SQL query for inserting a ticket
    const query = `
      INSERT INTO Ticket (customerID, ticketType, ticketPrice, startDate, expiryDate)
      VALUES (13450432, ?, ?, ?, ?)
    `;
  
    // Execute the query with the provided form data
    db.execute(query, [ticketType, ticketPrice, startDate, expiryDate], (error, results) => {
      if (error) {
        console.error("Error inserting ticket:", error);
        return res.status(500).json({ error: "Failed to insert ticket" });
      }
  
      // Return success response with the new ticketID
      res.status(201).json({ message: "Ticket created successfully", ticketID: results.insertId });
    });
  });
  

module.exports = ticketRoute;

