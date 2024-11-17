const express = require("express");
const cors = require("cors");
const db = require("../connect");
const path = require("path");
const maintRoute = express.Router();

maintRoute.use(cors());
maintRoute.use(express.json());

maintRoute.put('/:id', (req, res) => {
    const data = req.body;
    const maintenanceOpenDate = data.maintenanceDate;
    const maintenanceStatus = data.status;
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

module.exports = maintRoute;