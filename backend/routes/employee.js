const express = require("express");
const cors = require("cors");
const db = require("../connect");

const employeeRoute = express.Router();

employeeRoute.use(cors());
employeeRoute.use(express.json());

employeeRoute.post("/create", (req, res) => {
  // prettier-ignore
  const { empSSN, empFname, empMinitial, empLname, empAge, empDOB, phoneNumber, address, city, state, zipCode, hourly,
  } = req.body;
  const sql =
    "INSERT INTO employee (Ssn,Fname,Minitial,Lname, Age,Dateofbirth, Phonenumber, Address, City, State, Zipcode, Departmentid, Hourlypay, Benefits, Supervisorssn, Position) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
      1,
      hourly,
      1,
      null,
      102,
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
  const sql = "SELECT * from employee where deleteStatus = 0";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});
employeeRoute.put("/delete/:ssn", (req, res) => {
  const { ssn } = req.params;
  const sql = "UPDATE employee SET deleteStatus = 1 WHERE Ssn = ?";
  db.query(sql, [ssn], (err, result) => {
    if (err) console.log(err);
    res.send("row soft deleted");
  });
});

employeeRoute.get("/read/:ssn", (req, res) => {
  const { ssn } = req.params;
  const sql = "SELECT * from employee WHERE ssn = ? AND deleteStatus = 0";
  db.query(sql, [ssn], (err, result) => {
    if (err) console.log(err);
    res.json({ result });
  });
});
employeeRoute.put("/update", (req, res) => {
  const {
    Ssn,
    Fname,
    Minitial,
    Lname,
    Age,
    Dateofbirth,
    Phonenumber,
    Address,
    City,
    State,
    Zipcode,
    Hourlypay,
  } = req.body;

  const sql = `UPDATE employee SET Fname=?, Minitial=?, Lname=?, Age=?, Phonenumber=?, Address=?, City=?, State=?, Zipcode=?, Hourlypay=? WHERE Ssn = ?;`;
  db.query(
    sql,
    [
      Fname,
      Minitial,
      Lname,
      Age,
      Phonenumber,
      Address,
      City,
      State,
      Zipcode,
      Hourlypay,
      Ssn,
    ],
    (err, result) => {
      if (err) console.log(err);
      res.send("row updated");
    }
  );
});
module.exports = employeeRoute;
