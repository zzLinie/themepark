// src/components/GiftShopForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './DataEntryForm.css';

const GiftShopForm = () => {
  const [shopData, setShopData] = useState({
    shopName: '',
    location: '',
    products: [{ name: '', price: '' }],
    specialEvents: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleProductChange = (index, event) => {
    const newProducts = shopData.products.map((product, i) => {
      if (i === index) {
        return { ...product, [event.target.name]: event.target.value };
      }
      return product;
    });
    setShopData({ ...shopData, products: newProducts });
  };

  const addProductField = () => {
    setShopData({
      ...shopData,
      products: [...shopData.products, { name: '', price: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...shopData,
      specialEvents: shopData.specialEvents
        ? shopData.specialEvents.split(',').map(Number)
        : []
    };

    try {
      const response = await axios.post('http://localhost:5000/giftshops', payload);
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="dataentryformcontainer">
      <h1>Add New Gift Shop</h1>
      <form onSubmit={handleSubmit}>
        <label>Shop Name:</label>
        <input
          type="text"
          name="shopName"
          value={shopData.shopName}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={shopData.location}
          onChange={handleChange}
        />

        <h3>Products</h3>
        {shopData.products.map((product, index) => (
          <div className="product-container" key={index}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addProductField}>Add More Products</button>

        <label>Special Events (comma-separated):</label>
        <input
          type="text"
          name="specialEvents"
          value={shopData.specialEvents}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GiftShopForm;
