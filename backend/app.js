const express = require("express");

const app = express();

//authentication server
const auth = require("./routes/auth");
const employee = require("./routes/employee");
const parkstatus = require("./routes/parkstatus");
const events = require("./routes/events");
const rides = require("./routes/rides");
const shops = require("./routes/shops");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/admin", auth);
app.use("/employee", employee);
app.use("/parkstatus", parkstatus);
app.use("/events", events);
app.use("/rides", rides);
app.use("/shops", shops);

app.listen(3000, () => {
  console.log("server running");
});