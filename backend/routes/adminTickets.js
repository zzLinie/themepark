const express = require("express");
const cors = require("cors");
const db = require("../connect");

const adminTicket = express.Router();
adminTicket.use(cors());
adminTicket.use(express.json());

adminTicket.get("/retrieveAll", (req, res) => {
  const sql = `SELECT 
    ticket.customerID,
    customers.Fname,
    customers.Lname,
    ticket.ticketType,
    COUNT(ticket.ticketID) AS ticketCount,
    phoneNumber
    FROM 
    ticket
JOIN 
    customers ON ticket.customerID = customers.customerID
GROUP BY 
    ticket.customerID, customers.Fname, customers.Lname, ticket.ticketType;
`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json({ Result: result });
  });
});

adminTicket.post("/filterCustomer", (req, res) => {
  const sql = `SELECT 
    ticket.customerID,
    customers.Fname,
    customers.Lname,
    ticket.ticketType,
    COUNT(ticket.ticketID) AS ticketCount,
    customers.phoneNumber
FROM 
    ticket
JOIN 
    customers ON ticket.customerID = customers.customerID
WHERE 
    customers.Fname = ? and customers.Lname = ? and customers.phoneNumber = ?

GROUP BY 
    ticket.customerID, customers.Fname, customers.Lname, ticket.ticketType;
`;
  // prettier-ignore
  db.query(sql, [req.body.firstName, req.body.lastName, req.body.phoneNumber], (err, result) => {
    if(err) return res.json({Error: err});
    return res.json({Result: result})
  })
});

module.exports = adminTicket;
