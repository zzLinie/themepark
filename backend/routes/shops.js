const express = require("express");
const cors = require("cors");
const db = require("../connect");
const shopsRoute = express.Router();

shopsRoute.use(cors());
shopsRoute.use(express.json());

shopsRoute.get("/readRestaurants", (req, res) => {
  const sql = "SELECT * FROM shop WHERE shopType = 0";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

shopsRoute.get("/readGiftShops", (req, res) => {
    const sql = "SELECT * FROM shop WHERE shopType = 1";
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json({ result });
    });
  });

shopsRoute.post('/create', (req, res) => {
    const { shopName, location, shopType, products } = req.body;
    
    db.query(
      "INSERT INTO shop (shopName, Location, shopType) VALUES ( ?, ?, ?)",
      [shopName, location, shopType],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
  
        const shopID = result.insertId;
  
        const productEntries = products.map(p => [shopID, p.name, p.price]);
        db.query(
          "INSERT INTO products (shopID, productName, price) VALUES ?",
          [productEntries],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Gift shop and products added successfully!" });
          }
        );
      }
    );
  });

module.exports = shopsRoute;