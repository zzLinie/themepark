const express = require("express");
const cors = require("cors");
const db = require("../connect");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const employeeAuth = express.Router();

employeeAuth.use(express.json());
employeeAuth.use(cors());
employeeAuth.use(cookieParser());

const salt = 10;
employeeAuth.post("/create", (req, res) => {
  const sql =
    "INSERT INTO adminemployee (`EmployeeEmail`, `password`) VALUES (?);";
  //changes our plain text password into encrypted password
  bcrypt.hash(req.body.password.toString(), salt, (err, hashPassword) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.email, hashPassword];
    db.query(sql, [values], (err, sqlResult) => {
      if (err) return res.json({ Error: "Inserting data error in server" });
      return res.json({ Status: "Success" });
    });
  });
});

employeeAuth.post("/auth", (req, res) => {
  const sql =
    "SELECT EmployeeEmail, password FROM adminemployee where EmployeeEmail=?;";
  //data is sql results
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: `Login error in server` });
    //username is found
    // @ts-ignore
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password compare error" });
          if (response) {
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password not found" });
          }
        }
      );
    } else {
      return res.json({ Error: "no username found" });
    }
  });
});

module.exports = employeeAuth;
