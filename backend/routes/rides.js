const express = require("express");
const cors = require("cors");
const db = require("../connect");
const ridesRoute = express.Router();

ridesRoute.use(cors());
ridesRoute.use(express.json());

ridesRoute.get("/read", (req, res) => {
  const sql = "SELECT * FROM rides;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

// Insert a new ride
ridesRoute.post('/create', (req, res) => {
  // Extract ride details from request body
  const { rideName, capacity, start, end } = req.body;

  // Basic validation
  if (!rideName || !capacity || !start || !end) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert query
  const query = `
    INSERT INTO Rides (rideName, rideCount, capacity, openingTime, closingTime, technician)
    VALUES (?, 0, ?, ?, ?, 116433494)
  `;

  // Execute query with callback
  db.execute(query, [rideName, capacity, start, end], (error, results) => {
    if (error) {
      console.error("Error inserting ride:", error);
      return res.status(500).json({ error: "Failed to insert ride" });
    }

    // Return success response
    res.status(201).json({ message: "Ride inserted successfully", rideID: results.insertId });
  });
});

module.exports = ridesRoute;

