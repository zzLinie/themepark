let mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: { ca: fs.readFileSync(process.env.DB_SSL_CERT) },
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("connected");
});
module.exports = connection;
