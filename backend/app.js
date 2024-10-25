const express = require("express");

const app = express();

//authentication server
const auth = require("./routes/auth");

app.use("/admin", auth);

app.listen(3000, () => {
  console.log("server running");
});
