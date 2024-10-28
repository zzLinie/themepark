const express = require("express");
const cors = require("cors");
const db = require("../connect");
const shopsRoute = express.Router();

shopsRoute.use(cors());
shopsRoute.use(express.json());

shopsRoute.get("/readRestaurants", (req, res) => {
  const sql = "SELECT * FROM shop WHERE shopType = 0";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

shopsRoute.get("/readGiftShops", (req, res) => {
    const sql = "SELECT * FROM shop WHERE shopType = 1";
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json({ result });
    });
  });

module.exports = shopsRoute;