import Header from "../components/header";
import DiningCard from "../components/diningCard";
import diningImage from "../assets/images/placeholder-image.webp";
import "./events.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataEntryForm.css";

export default function Dining() {
  const [restaurantList, setRestaurantList] = useState([]);
  const getRestaurants = () => {
    axios
      .get("https://themepark-server.vercel.app/shops/readRestaurants")
      .then((res) => setRestaurantList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRestaurants();
  }, []);
  return (
    <div>
      <Header />
      <h1>Restaurants & Dining</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam porro
        dignissimos dolore dolor maiores. Aut optio rem ipsa nostrum, provident,
        obcaecati assumenda asperiores, eveniet dolore consectetur beatae! Illo,
        fuga nesciunt?
      </p>
      <div>
        <h2>Filter By Dining Type</h2>
        <select name="dining" id="dining">
          <option value="all">All Resturants</option>
          <option value="kids">Mexican Food</option>
          <option value="kids">Italian Food</option>
          <option value="kids">Snacks & Beverages</option>
          <option value="family">Desserts</option>
        </select>
      </div>
      {restaurantList &&
        restaurantList.map((restaurant, index) => (
          <DiningCard
            key={index}
            diningImage={diningImage}
            diningLocation={restaurant.location}
            diningName={restaurant.shopName}
            diningProducts={"products here"}
            diningOverview={"burger and fries"}
          />
        ))}
    </div>
  );
}
