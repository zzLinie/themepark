import { useState } from "react";
import axios from "axios";
import "./DataEntryForm.css";
import EmployeeHeader from "../components/employeeHeader";

const RestaurantForm = () => {
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: "",
    restaurantType: "",
    location: "",
    products: [{ name: "", price: "" }],
    specialEvents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleProductChange = (index, event) => {
    const newProducts = restaurantData.products.map((product, i) => {
      if (i === index) {
        return { ...product, [event.target.name]: event.target.value };
      }
      return product;
    });
    setRestaurantData({ ...restaurantData, products: newProducts });
  };

  const addProductField = () => {
    setRestaurantData({
      ...restaurantData,
      products: [...restaurantData.products, { name: "", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...restaurantData,
      specialEvents: restaurantData.specialEvents
        ? restaurantData.specialEvents.split(",").map(Number)
        : [],
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/restaurants",
        payload
      );
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <EmployeeHeader />
      <div className="dataentryformcontainer">
        <h1>Add New Restaurant</h1>
        <form onSubmit={handleSubmit}>
          <label>Restaurant Name:</label>
          <input
            type="text"
            name="restaurantName"
            value={restaurantData.restaurantName}
            onChange={handleChange}
            required
          />

          <label>Restaurant Type:</label>
          <input
            type="number"
            name="restaurantType"
            value={restaurantData.restaurantType}
            onChange={handleChange}
            required
          />

          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={restaurantData.location}
            onChange={handleChange}
          />

          <h3>Products</h3>
          {restaurantData.products.map((product, index) => (
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
          <button type="button" onClick={addProductField}>
            Add More Products
          </button>

          <label>Special Events (comma-separated):</label>
          <input
            type="text"
            name="specialEvents"
            value={restaurantData.specialEvents}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default RestaurantForm;
