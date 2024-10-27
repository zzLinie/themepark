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
      null,
      hourly,
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
employeeRoute.get("/read", (req, res) => {
  const sql = "SELECT * from adminemployeesview";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});
employeeRoute.delete("/delete/:ssn", (req, res) => {
  const { ssn } = req.params;
  const sql = "Delete from employee where Ssn = ?";
  db.query(sql, [ssn], (err, result) => {
    if (err) console.log(err);
    res.send("row deleted");
  });
});

module.exports = employeeRoute;
