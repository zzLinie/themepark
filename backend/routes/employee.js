const express = require("express");
const cors = require("cors");

const employeeRoute = express.Router();

employeeRoute.use(cors());
employeeRoute.use(express.json());

employeeRoute.post("/create", (req, res) => {
  console.log(req.body);
});

module.exports = employeeRoute;
