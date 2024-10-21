const express = require("express");
const cors = require("cors");
const db = require("./connect");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

//parses data that comes into json format
app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("server running");
});
