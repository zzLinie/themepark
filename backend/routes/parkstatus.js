const express = require("express");
const cors = require("cors");
const db = require("../connect");

const parkStatusRoute = express.Router();

parkStatusRoute.use(cors());
parkStatusRoute.use(express.json());

parkStatusRoute.post("/create", (req, res) => {
  const {
    parkStatusDate,
    weatherType,
  } = req.body;
  const sql =
    "INSERT INTO parkstatus (date, weatherType) VALUES (?,?)";
  db.query(
    sql,
    [
      parkStatusDate,
      weatherType,
    ],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("data recieved");
      }
    }
  );
});
parkStatusRoute.get("/read", (req, res) => {
  const sql = "SELECT * from parkstatus WHERE date >= CURRENT_DATE";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

parkStatusRoute.get("/read/:parkStatusID", (req, res) => {
  const { parkStatusID } = req.params;
  const sql = "SELECT * from parkstatus where parkStatusID = ?;";
  db.query(sql, [parkStatusID], (err, result) => {
    if (err) console.log(err);
    res.json({ result });
  });
});

parkStatusRoute.put("/:id", (req, res) => {
  const {
    date,
    weatherType,
  } = req.body;
  const { id } = req.params;
  const sql = `UPDATE parkstatus SET date=?, weatherType=? WHERE parkStatusID = ?;`;
  db.query(
    sql,
    [
      date,
      weatherType,
      id
    ],
    (err, result) => {
      if (err) console.log(err);
      res.send("row updated");
    }
  );
});

parkStatusRoute.get("/readhistory", (req, res) => {
    const sql = "SELECT * from parkstatus WHERE date <= CURRENT_DATE LIMIT 50";
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.json({ result });
    });
});

module.exports = parkStatusRoute;
