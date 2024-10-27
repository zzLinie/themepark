import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./DataEntryForm.css";

const ShopForm = () => {
  // Initialize the form state
  const [formData, setFormData] = useState({
    type: 'giftshop',        // Default to shop, can be 'restaurant' or 'shop'
    shopName: '',        // Name of the shop
    location: '',        // Location of the shop
    products: [],        // Array for products with name and price
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle adding a new product
  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: '', price: '' }] // Add a new product with empty name and price
    });
  };

  // Handle changes to product fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index][name] = value; // Update the respective product's name or price
    setFormData({ ...formData, products: updatedProducts });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the submitted form data
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="dataentryformcontainer">
      <h1>Add New Shop Entry</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Type Selection Dropdown */}
        <label>Type:</label>
        <Select
          name="type"
          options={[
            { value: 'giftshop', label: 'Gift Shop' },
            { value: 'restaurant', label: 'Restaurant' }
          ]}
          value={{ value: formData.type, label: formData.type.charAt(0).toUpperCase() + formData.type.slice(1) }} // Capitalize label
          onChange={(option) => setFormData({ ...formData, type: option.value })}
          placeholder="Select Type"
        />

        {/* Shop Name */}
        <label>Shop Name:</label>
        <input
          type="text"
          name="shopName"
          value={formData.shopName}
          onChange={handleChange}
          required
        />

        {/* Location */}
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Products Section */}
        <label>Products:</label>
        {formData.products.map((product, index) => (
          <div key={index} className="product-entry">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => handleProductChange(index, e)}
              placeholder="Product Price"
              required
            />
          </div>
        ))}
        
        {/* Add More Product Button */}
        <button type="button" onClick={handleAddProduct}>
          Add More Product
        </button>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShopForm;
