const express = require("express");
const cors = require("cors");
const db = require("../connect");

const employeeRoute = express.Router();

employeeRoute.use(cors());
employeeRoute.use(express.json());

employeeRoute.post("/create", (req, res) => {
  const {
    empSSN,
    empFname,
    empMinitial,
    empLname,
    empAge,
    empDOB,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    hourly,
  } = req.body;
  const sql =
    "INSERT INTO employee (Ssn,Fname,Minitial,Lname, Age,Dateofbirth, Phonenumber, Address, City, State, Zipcode, Departmentid, Hourlypay, Position, Benefits, Supervisorssn, EmployeeEmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      empSSN,
      empFname,
      empMinitial,
      empLname,
      empAge,
      empDOB,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      hourly,
      null,
      null,
      null,
      null,
      null,
    ],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("data recieved");
      }
    }
  );
});

module.exports = employeeRoute;
