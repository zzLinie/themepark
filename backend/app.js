const express = require("express");
const cors = require("cors");
const db = require("./connect");

const app = express();

//parses data that comes into json format
app.use(express.json());

app.use(cors());

app.listen(3000, () => {
  console.log("server running");
});
