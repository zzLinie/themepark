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

module.exports = eventsRoute;