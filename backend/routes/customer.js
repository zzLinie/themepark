// customer.js
const express = require("express");
const db = require("../connect");
const { verifyUser } = require("../routes/customerLogin");
const cookieParser = require("cookie-parser");

const customerRoute = express.Router();

customerRoute.use(express.json());
customerRoute.use(cookieParser());

// Route to get customer details by customerID
customerRoute.get("/read", verifyUser, (req, res) => {
  console.log(req.user);
  const customerID = req.user.customerID;
  const sql = "SELECT * FROM customers WHERE customerID = ?";
  db.query(sql, [customerID], (err, result) => {
    if (err) {
      console.error("Error fetching customer details:", err);
      res.status(500).json({ error: "Failed to fetch customer details" });
    } else {
      res.json(result[0]); // Assuming customerID is unique
    }
  });
});

// Route to update customer details
customerRoute.put("/update", (req, res) => {
  const {
    customerID,
    Fname,
    Minitial,
    Lname,
    Age,
    phoneNumber,
    streetAddress,
    City,
    State,
    ZIP,
  } = req.body;

  const sql = `
    UPDATE customers
    SET Fname = ?, Minitial = ?, Lname = ?, Age = ?, phoneNumber = ?, streetAddress = ?, City = ?, State = ?, ZIP = ?
    WHERE customerID = ?
  `;

  db.query(
    sql,
    [
      Fname,
      Minitial || null,
      Lname,
      Age,
      phoneNumber,
      streetAddress,
      City,
      State,
      ZIP,
      customerID,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating customer details:", err);
        res.status(500).json({ error: "Failed to update customer details" });
      } else {
        res.json({ message: "Customer details updated successfully" });
      }
    }
  );
});

// Route to delete a customer by customerID
customerRoute.delete("/delete", verifyUser, (req, res) => {
  const { customerID } = req.user;
  const sql = "DELETE FROM customers WHERE customerID = ?";
  db.query(sql, [customerID], (err, result) => {
    if (err) {
      console.error("Error deleting customer:", err);
      res.status(500).json({ error: "Failed to delete customer" });
    } else {
      res.json({ message: "Customer deleted successfully" });
    }
  });
});

customerRoute.get("/tickets", verifyUser, (req, res) => {
  let { customerID } = req.user;
  customerID = parseInt(customerID, 10); // Convert to integer

  const sql = `
      SELECT ticket.ticketID, ticket.ticketType, ticket.startDate, ticket.expiryDate
      FROM ticket
      WHERE ticket.customerID = ?
      ORDER BY ticket.startDate DESC
    `;
  db.query(sql, [customerID], (err, results) => {
    if (err) {
      console.error("Error fetching customer tickets:", err);
      res.status(500).json({ error: "Failed to fetch customer tickets" });
    } else {
      res.json(results);
    }
  });
});
customerRoute.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });
  return res.json({ Response: "Logged out Successfully" });
});

// Export the router
module.exports = customerRoute;
