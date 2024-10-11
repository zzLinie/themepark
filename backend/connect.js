let mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

var config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { ca: fs.readFileSync(process.env.DB_SSL_PATH) },
};

const conn = new mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});
