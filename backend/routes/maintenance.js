const express = require("express");
const cors = require("cors");
const db = require("../connect");
const path = require("path");
const maintRoute = express.Router();

maintRoute.use(cors());
maintRoute.use(express.json());

maintRoute.put('/:id', (req, res) => {
    const { maintenanceDate, status } = req.body;
    db.query(
        'UPDATE maintenance SET maintenanceOpenDate = ?, maintenanceStatus = ? WHERE maintenanceID = ?',
        [maintenanceDate, status, req.params.id],
        (err) => {
            if (err) throw err;
        }
    );
  });

module.exports = maintRoute;