const express = require("express");
const cors = require("cors");
const db = require("../connect");

const ride = express.Router();

ride.use(cors());
ride.use(express.json());

ride.get("/read", (req, res) => {
  const sql = "select * from rides;";
  db.query(sql, [], (err, result) => {
    if (err) console.log(err);
    res.json({ result });
  });
});

module.exports = ride;
