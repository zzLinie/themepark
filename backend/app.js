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

app.use(cors());
app.use(express.json());
app.use("/admin", auth);
app.use("/employee", employee);
app.use("/parkstatus", parkstatus);
app.use("/events", events);
app.use("/rides", rides);
app.use("/shops", shops);
app.use("/employees", employeeAuth);
app.use("/tickets", tickets);

const corsOptions = {origin:`https://calm-sea-0fc88f210.5.azurestaticapps.net`,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.get(`/`, (req, res) => {
  res.send(`Cors-enabled for specified domain`);
});

app.listen(3000, () => {
  console.log("server running");
});
