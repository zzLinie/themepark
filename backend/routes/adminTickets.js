const express = require("express");
const cors = require("cors");
const db = require("../connect");

const adminTicket = express.Router();
adminTicket.use(cors());
adminTicket.use(express.json());

adminTicket.post("/customer-visit", (req, res) => {
  const sql = `SELECT 
    c.Fname AS Fname,
    v.CustomerID,
    tt.ticketName AS ticketTypeName,
    ANY_VALUE(t.startDate) AS ticketStartDate,  
    COUNT(DISTINCT v.ticketID) AS ticketTypeCount  
FROM 
    visit v
JOIN 
    ticket t ON v.ticketID = t.ticketID
JOIN 
    parkstatus ps ON v.parkStatusID = ps.parkStatusID
JOIN 
    customers c ON v.CustomerID = c.customerID
JOIN 
    ticketType tt ON t.ticketType = tt.ticketType
WHERE 
    v.Date = ?
    AND tt.ticketType != 4  -- Exclude cancelled visits
    AND tt.ticketType != 5  -- Exclude cancelled visits
    AND ps.capacity > 0  -- Exclude visits where park capacity is 0
GROUP BY 
    v.CustomerID, tt.ticketName, t.ticketType;

`;
  // prettier-ignore
  db.query(sql, [req.body.date], (err, result) => {
    if(err) return res.json({Error: err});
    return res.json({Result: result})
  })
});
adminTicket.get("/availibility", (req, res) => {
  const { date } = req.query;
  const sql = `SELECT 
    DATE_FORMAT(ps.date, '%Y-%m-%d') AS Date,
    ps.capacity AS TotalCapacity,
    CASE 
        WHEN ps.capacity = 0 THEN 0  -- If park capacity is 0, set TotalVisits to 0
        ELSE COALESCE(COUNT(CASE WHEN tt.ticketType NOT IN (4, 5) THEN v.CustomerID END), 0)
    END AS TotalVisits,
    CASE 
        WHEN ps.capacity = 0 THEN 0  -- If park capacity is 0, set RemainingCapacity to 0
        ELSE (ps.capacity - COALESCE(COUNT(CASE WHEN tt.ticketType NOT IN (4, 5) THEN v.CustomerID END), 0))
    END AS RemainingCapacity
FROM 
    parkstatus ps
LEFT JOIN 
    visit v ON ps.date = v.Date AND ps.parkStatusID = v.parkStatusID
LEFT JOIN 
    ticket t ON v.ticketID = t.ticketID
LEFT JOIN 
    ticketType tt ON t.ticketType = tt.ticketType
WHERE 
    ps.date = ? 
GROUP BY 
    ps.date, ps.capacity
ORDER BY 
    ps.date ASC;
`;
  db.query(sql, [date], (err, result) => {
    if (err) return res.json({ Response: err });
    return res.json({ Response: result });
  });
});
adminTicket.post("/availibility", (req, res) => {
  const sql = `SELECT 
    CASE 
        WHEN ps.capacity = 0 THEN 0  -- If park capacity is 0, set RemainingCapacity to 0
        ELSE (ps.capacity - COALESCE(SUM(CASE WHEN tt.ticketType NOT IN (4, 5) THEN 1 ELSE 0 END), 0))
    END AS TicketsAvailable
FROM 
    parkstatus ps
LEFT JOIN 
    visit v ON ps.date = v.Date AND ps.parkStatusID = v.parkStatusID
LEFT JOIN 
    ticket t ON v.ticketID = t.ticketID
LEFT JOIN 
    ticketType tt ON t.ticketType = tt.ticketType
WHERE 
    ps.date = ?
GROUP BY 
    ps.date, ps.capacity
ORDER BY 
    ps.date ASC;
`;
  const { date } = req.body;
  db.query(sql, [date], (err, result) => {
    if (err) return res.json({ Response: err });
    if (result[0]) {
      return res.json({ Response: result[0].TicketsAvailable });
    }
    return res.json({ Response: "no data found" });
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
    if (err) return res.json({ Response: err });
    return res.json({ Response: result });
  });
});

module.exports = adminTicket;
//customers visiting park along with tickets they bought that day
/*SELECT 
    c.Fname AS Fname,
    v.CustomerID,
    ANY_VALUE(t.ticketID) AS ticketID,  -- Use ANY_VALUE() to avoid the GROUP BY issue
    tt.ticketName AS ticketTypeName,
    ANY_VALUE(t.startDate) AS ticketStartDate,  -- Use ANY_VALUE() here
    ANY_VALUE(t.expiryDate) AS ticketExpiryDate,  -- Use ANY_VALUE() here
    COUNT(DISTINCT t.ticketID) AS ticketTypeCount
FROM 
    visit v
JOIN 
    ticket t ON v.ticketID = t.ticketID
JOIN 
    parkstatus ps ON v.parkStatusID = ps.parkStatusID
JOIN 
    customers c ON v.CustomerID = c.customerID
JOIN 
    ticketType tt ON t.ticketType = tt.ticketType
WHERE 
    v.Date = '2024-10-01'
    AND tt.ticketType != 4 AND tt.ticketType != 5 -- Exclude cancelled visits
GROUP BY 
    v.CustomerID, tt.ticketName, t.ticketType; */
