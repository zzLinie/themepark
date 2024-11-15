const express = require("express");
const cors = require("cors");
const db = require("../connect");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const employeeAuth = express.Router();

employeeAuth.use(express.json());
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
      if (err) return res.json({ Error: err });
      return res.json({ Status: "Success" });
    });
  });
});

employeeAuth.post("/auth", (req, res) => {
  const sql =
    "SELECT EmployeeEmail, password FROM adminemployee where EmployeeEmail=?;";
  //data is sql results
  db.query(sql, [req.body.email], async (err, result) => {
    //sql query error
    if (err) return res.send("sql query error");

    //email doesnt exist
    if (!result[0]) {
      //emaildoesnt exist
      return res.json({ Response: "Email doesnt exist" });
    }
    //database stored password
    const { password } = result[0];
    const inputedPassword = req.body.password;

    //compare user inputted password to resulted query hash
    bcrypt.compare(inputedPassword, password, (err, result) => {
      if (err) return res.json({ Response: "Password compare error" });

      //user inputted wrong password
      if (!result) {
        return res.json({ Response: "Password not found" });
      }

      //extra data sent with token to track authorization
      const payload = {
        email: req.body.email,
        role: "Employee",
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      console.log("employee ", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.json({ auth: true, token: token });
    });
  });
});
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Verify: false });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.json({ Verify: false });
      //save token payload data
      req.user = decoded;
      next();
    });
  }
};

// @ts-ignore
employeeAuth.get("/verify", verifyUser, (req, res) => {
  // @ts-ignore
  //send the payloaded token data from backend
  return res.json({ Verify: true, user: req.user });
});

module.exports = employeeAuth;
