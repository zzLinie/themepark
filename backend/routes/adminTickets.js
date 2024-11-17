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
adminTicket.get("/availibility", (req, res) => {
  const { date } = req.query;
  const sql = `SELECT 
    DATE_FORMAT(ps.date, '%Y-%m-%d') AS Date,
    ps.capacity AS TotalCapacity,
    COALESCE(COUNT(v.CustomerID), 0) AS TotalVisits,
    CASE 
        WHEN ps.capacity = 0 THEN 0
        ELSE (ps.capacity - COALESCE(COUNT(v.CustomerID), 0))
    END AS RemainingCapacity
FROM 
    parkstatus ps
LEFT JOIN 
    visit v
ON 
    ps.date = v.Date AND ps.parkStatusID = v.parkStatusID
WHERE 
    ps.date = ? 
GROUP BY 
    ps.date, ps.capacity
ORDER BY 
    ps.date ASC;`;
  db.query(sql, [date], (err, result) => {
    if (err) return res.json({ Response: err });
    return res.json({ Response: result });
  });
});
adminTicket.get("/days", (req, res) => {
  const sql = `SELECT 
    DISTINCT DATE_FORMAT(ps.date, '%Y-%m-%d') AS Date
FROM 
    parkstatus ps
LEFT JOIN 
    visit v
ON 
    ps.date = v.Date AND ps.parkStatusID = v.parkStatusID
ORDER BY 
    DATE_FORMAT(ps.date, '%Y-%m-%d') ASC;`;
  db.query(sql, (err, result) => {
    return res.json({ Response: result });
  });
});

adminTicket.post("/customer", (req, res) => {
  const sql = `SELECT 
    ticketID, 
    ticketType, 
    startDate, 
    expiryDate
FROM 
    ticket
WHERE 
    customerID = ? AND 
    ticketType = ?;`;
  db.query(sql, [req.body.customerID, req.body.ticketType], (err, result) => {
    console.log(req.body);
    if (err) return res.json({ Response: err });
    return res.json({ Response: result });
  });
});

module.exports = adminTicket;
