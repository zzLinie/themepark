const express = require("express");
const cors = require("cors");
const db = require("../connect");
const path = require("path");
const maintRoute = express.Router();

maintRoute.use(cors());
maintRoute.use(express.json());

maintRoute.post('/create', (req, res) =>  {
    const{
        rideID,
        maintenanceOpenDate,
        maintenanceStatus,
    } = req.body

    db.query(
        'INSERT INTO maintenance(maintenanceOpenDate, maintenanceStatus, rideID) VALUES(?, ?, ?',
        [maintenanceOpenDate, maintenanceStatus, rideID],
        (err) => {
            if (err) throw err;
            res.send("Successfully inserted maintenance")
        }
    );
});

maintRoute.put('/:id', (req, res) => {
    const{
        maintenanceOpenDate,
        maintenanceStatus,
    } = req.body
    //const { maintenanceDate, status } = req.body;
    db.query(
        'UPDATE maintenance SET maintenanceOpenDate = ?, maintenanceStatus = ? WHERE maintenanceID = ?',
        [maintenanceOpenDate, maintenanceStatus, req.params.id],
        (err) => {
            if (err) throw err;
            res.send("Maintenance updated successfully")
        }
    );
  });

  db.query(
    "INSERT INTO maintenance(maintenanceOpenDate, maintenanceStatus, rideID) VALUES(?, ?, ?",
    [maintenanceOpenDate, maintenanceStatus, rideID],
    (err) => {
      if (err) throw err;
      res.send("Successfully inserted maintenance");
    }
  );
});

maintRoute.put("/:id", (req, res) => {
  const { maintenanceOpenDate, maintenanceStatus } = req.body;
  //const { maintenanceDate, status } = req.body;
  db.query(
    "UPDATE maintenance SET maintenanceOpenDate = ?, maintenanceStatus = ? WHERE maintenanceID = ?",
    [maintenanceOpenDate, maintenanceStatus, req.params.id],
    (err) => {
      if (err) throw err;
      res.send("Maintenance updated successfully");
    }
  );
});

module.exports = maintRoute;
