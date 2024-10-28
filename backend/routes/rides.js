const express = require("express");
const cors = require("cors");
const db = require("../connect");
const ridesRoute = express.Router();

ridesRoute.use(cors());
ridesRoute.use(express.json());

ridesRoute.get("/read", (req, res) => {
  const sql = "SELECT * FROM rides";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

module.exports = ridesRoute;