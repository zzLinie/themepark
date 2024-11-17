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

// const salt = 10;
// customerRoute.put("/", (req, res) => {
//   const sql = "UPDATE customers SET `password` = ?;";

//   //changes our plain text password into encrypted password
//   bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
//     if (err) return res.json({ Error: "Error for hashing password" });
//     const pw = [hashPassword];
//     db.query(sql, [pw], (err, sqlResult) => {
//       if (err) return res.json({ Error: "Inserting data error in server" });
//       return res.json({ Status: "Success" });
//     });
//   });
// });
customerRoute.post("/", (req, res) => {
  const sql =
    "SELECT customerID, Email, password FROM customers where Email=?;";
  db.query(sql, [req.body.email], (err, result) => {
    //sql query error
    if (err) return res.send("sql query error");

    //email doesnt exist
    if (!result[0]) {
      return res.json({ Response: "Email doesnt exist" });
    }
    //database stored password
    const { password } = result[0];
    const inputedPassword = req.body.password;
    //database stored id
    const { customerID } = result[0];

    //compare user inputted password to resulted query hash
    bcrypt.compare(inputedPassword, password, (err, result) => {
      if (err) return res.json({ Response: "Password compare error" });

      //user inputted wrong password
      if (!result) {
        return res.json({ Response: "Password not found" });
      }
      //customerID from sql query
      //create token for user
      console.log(customerID);
      const payload = {
        id: customerID,
        role: "Customer",
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
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
      req.user = decoded;
      next();
    });
  }
};

module.exports = customerRoute;
