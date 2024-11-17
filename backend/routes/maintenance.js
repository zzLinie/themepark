const express = require("express");
const cors = require("cors");
const db = require("../connect");
const path = require("path");
const maintRoute = express.Router();

maintRoute.use(cors());
maintRoute.use(express.json());

maintRoute.put('/:maintenanceID', (req, res) => {
    const { maintenanceOpenDate, maintenanceStatus } = req.body;
    db.query(
        'UPDATE maintenance SET maintenanceOpenDate = ?, maintenanceStatus = ? WHERE maintenanceID = ?',
        [maintenanceOpenDate, maintenanceStatus, req.params.maintenanceID],
        (err) => {
            if (err) throw err;
        }
    );
  });

module.exports = maintRoute;