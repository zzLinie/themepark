const express = require("express");
const cors = require("cors");
const db = require("../connect");
const shopsRoute = express.Router();

shopsRoute.use(cors());
shopsRoute.use(express.json());

shopsRoute.get("/read", (req, res) => {
  const sql = "SELECT * FROM shop";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

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

shopsRoute.post("/create", (req, res) => {
  const { shopName, location, shopType, products } = req.body;

  db.query(
    "INSERT INTO shop (shopName, Location, shopType) VALUES ( ?, ?, ?)",
    [shopName, location, shopType],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const shopID = result.insertId;

      const productEntries = products.map((p) => [shopID, p.name, p.price]);
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

shopsRoute.post("/shops", (req, res) => {
  const { shopName, location, shopType, shopDesc, imageFileName } = req.body;
  const query = "INSERT INTO shop (shopName, location, shopType, shopDesc, imageFileName) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [shopName, location, shopType, shopDesc, imageFileName], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Failed to create shop");
      }
      res.status(201).send("Shop created successfully");
  });
});

shopsRoute.put("/:shopID", (req, res) => {
  const { shopID } = req.params;
  const { shopName, location, shopType, shopDesc, imageFileName } = req.body;
  const query = `
      UPDATE shop 
      SET shopName = ?, location = ?, shopType = ?, shopDesc = ?, imageFileName = ? 
      WHERE shopID = ?`;
  db.query(query, [shopName, location, shopType, shopDesc, imageFileName, shopID], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Failed to update shop");
      }
      res.send("Shop updated successfully");
  });
});

shopsRoute.delete("/:shopID", (req, res) => {
  const { shopID } = req.params;
  const query = "DELETE FROM shop WHERE shopID = ?";
  db.query(query, [shopID], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Failed to delete shop");
      }
      res.send("Shop deleted successfully");
  });
});

module.exports = shopsRoute;
