const express = require("express");
const cors = require("cors");
const db = require("../connect");
const eventsRoute = express.Router();

eventsRoute.use(cors());
eventsRoute.use(express.json());

eventsRoute.get("/read", (req, res) => {
  const sql = "SELECT * FROM specialevents WHERE startDate >= CURRENT_DATE ORDER BY startDate LIMIT 3";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

// Route to add a new special event
eventsRoute.post('/create', (req, res) => {
  const {
    eventName,
    eventType,
    startDate,
    endDate,
  } = req.body;

  // Basic validation
  if (!eventName || eventType === undefined || !startDate || !endDate) {
    return res.status(400).json({ error: "Event name, type, date, and start time are required." });
  }

  // Define SQL query for inserting a special event
  const query = `
    INSERT INTO SpecialEvents (eventName, eventType, startDate, endDate)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the query with the provided form data
  db.execute(query, [
    eventName,
    eventType,
    startDate,
    endDate,
  ], (error, results) => {
    if (error) {
      console.error("Error inserting special event:", error);
      return res.status(500).json({ error: "Failed to insert special event" });
    }

    // Return success response with the new eventID
    res.status(201).json({ message: "Special event created successfully", eventID: results.insertId });
  });
});


module.exports = eventsRoute;

