const express = require("express");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const employee = require("./routes/employee");
const parkstatus = require("./routes/parkstatus");
const events = require("./routes/events");
const rides = require("./routes/rides");
const shops = require("./routes/shops");
const employeeAuth = require("./routes/employeeAuth");
const tickets = require("./routes/tickets");
const adminTickets = require("./routes/adminTickets");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT"],
  })
);

app.use(express.json());
app.use("/admin", auth);
app.use("/employee", employee);
app.use("/parkstatus", parkstatus);
app.use("/events", events);
app.use("/rides", rides);
app.use("/shops", shops);
app.use("/employees", employeeAuth);
app.use("/tickets", tickets);
app.use("/adminTickets", adminTickets);

app.get(`/`, (req, res) => {
  res.send(`Cors-enabled for specified domain`);
});

app.listen(3000, () => {
  console.log("server running");
});
