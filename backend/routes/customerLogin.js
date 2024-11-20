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

const verifyUserUpdatePW = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      req.user = decoded;
      next();
    });
  }
};

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
customerRoute.put("/update-password", verifyUserUpdatePW, (req, res) => {
  const customerID = req.user.customerID;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required." });
  }

  // Hash the new password
  bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    const sql = "UPDATE customers SET password = ? WHERE customerID = ?";
    db.query(sql, [hashedPassword, customerID], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      return res.json({ message: "Password updated successfully" });
    });
  });
});
// Route to register a new customer
customerRoute.post("/register", (req, res) => {
  const {
    Email,
    password,
    Fname,
    Lname,
    Age,
    phoneNumber,
    streetAddress,
    City,
    State,
    ZIP,
    Minitial, // Optional
  } = req.body;

  // Validate required fields
  if (
    !Email ||
    !password ||
    !Fname ||
    !Lname ||
    !Age ||
    !phoneNumber ||
    !streetAddress ||
    !City ||
    !State ||
    !ZIP
  ) {
    return res
      .status(400)
      .json({ error: "All fields except Middle Initial are required." });
  }

  // Check if Email already exists
  const checkEmailQuery = "SELECT * FROM customers WHERE Email = ?";
  db.query(checkEmailQuery, [Email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    bcrypt.hash(password, salt, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Error hashing password:", hashErr);
        return res.status(500).json({ error: "Server error" });
      }

      // Insert the new customer into the database
      const insertQuery = `INSERT INTO customers 
      (Email, password, Fname, Lname, Age, phoneNumber, streetAddress, City, State, ZIP, Minitial)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertQuery,
        [
          Email,
          hashedPassword,
          Fname,
          Lname,
          Age,
          phoneNumber,
          streetAddress,
          City,
          State,
          ZIP,
          Minitial || null, // Set to null if not provided
        ],
        (insertErr, result) => {
          if (insertErr) {
            console.error("Error inserting customer:", insertErr);
            return res.status(500).json({ error: "Database error" });
          }

          res.status(201).json({ message: "Customer registered successfully" });
        }
      );
    });
  });
});
customerRoute.post("/login", (req, res) => {
  const sql =
    "SELECT customerID, Email, password FROM customers where Email=?;";
  //data is sql results
  db.query(sql, [req.body.email], async (err, result) => {
    //sql query error
    if (err) return res.send("sql query error");

    //email doesnt exist
    if (!result[0]) {
      return res.json({ Response: "Email doesnt exist" });
    }
    //database stored password
    const { password, customerID, Email } = result[0];
    const inputedPassword = req.body.password;

    //compare user inputted password to resulted query hash
    bcrypt.compare(inputedPassword, password, (err, result) => {
      if (err) return res.json({ Response: "Password compare error" });

      //user inputted wrong password
      if (!result) {
        return res.json({ Response: "Password not found" });
      }

      //create token for user
      const payload = {
        customerID: customerID,
        role: "Customer",
        email: req.body.email,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 86400000,
      });
      return res.json({ auth: true, token: token });
    });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.manualVerify = false; // Set this flag to false if no token is provided
    // res.json({ Verify: false }); // Return response immediately if no token
    return next();
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        req.manualVerify = false; // Set this flag to false if there's an error verifying the token
        return res.json({ Verify: false }); // Return response immediately if token verification fails
      }
      req.manualVerify = true; // Set this flag to true if the user is verified
      req.user = decoded; // Attach the decoded user data to the request object
      next(); // Proceed to the next middleware/route handler
    });
  }
};
// @ts-ignore
customerRoute.get("/verify", verifyUser, (req, res) => {
  // @ts-ignore
  return res.json({ Verify: true, customer: req.user });
});
module.exports = { customerRoute, verifyUser };
