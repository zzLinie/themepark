const express = require("express");
const cors = require("cors");
const db = require("./connect");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

//parses data that comes into json format
app.use(express.json());

app.use(cors());
app.use(cookieParser());

const salt = 10;
app.post("/createAdmin", (req, res) => {
  const sql = "INSERT INTO admin (`userName`, `password`) VALUES (?);";

  //changes our plain text password into encrypted password
  bcrypt.hash(req.body.password.toString(), salt, (err, hashPassword) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.userName, hashPassword];
    db.query(sql, [values], (err, sqlResult) => {
      if (err) return res.json({ Error: "Inserting data error in server" });
      return res.json({ Status: "Success" });
    });
  });
});
//admin login post request
app.post("/admin", (req, res) => {
  const sql = "SELECT userName, password FROM admin where userName=?;";
  //data is sql results
  db.query(sql, [req.body.userName], (err, data) => {
    if (err) return res.json({ Error: `Login error in server` });
    //username is found
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Erorr: "password compare error" });
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

app.listen(3000, () => {
  console.log("server running");
});
