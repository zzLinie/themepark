const express = require("express");
const db = require("../connect");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const customerRoute = express.Router();

//parses data that comes into json format
customerRoute.use(express.json());
//allows cookies to be sent to request header
customerRoute.use(cookieParser());

const salt = 10;
customerRoute.put("/", (req, res) => {
  const sql = "UPDATE customers SET `password` = ?;";

  //changes our plain text password into encrypted password
  bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const pw = [hashPassword];
    db.query(sql, [pw], (err, sqlResult) => {
      if (err) return res.json({ Error: "Inserting data error in server" });
      return res.json({ Status: "Success" });
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
      req.user = decoded;
      next();
    });
  }
};

module.exports = customerRoute;
