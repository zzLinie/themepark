const express = require("express");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const employee = require("./routes/employee");
const parkstatus = require("./routes/parkstatus");
const events = require("./routes/events");
const ride = require("./routes/ride");

app.use(cors());
app.use(express.json());
app.use("/admin", auth);
app.use("/employee", employee);
app.use("/parkstatus", parkstatus);
app.use("/events", events);
app.use("/ride", ride);

app.listen(3000, () => {
  console.log("server running");
});
