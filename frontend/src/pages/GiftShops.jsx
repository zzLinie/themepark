import Header from "../components/header";
import DiningCard from "../components/diningCard";
import diningImage from "../assets/images/placeholder-image.webp";
import "./events.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataEntryForm.css";

export default function GiftShops() {
  const [shopList, setShopList] = useState([]);
  const getShops = () => {
    axios
      .get("https://themepark-server.vercel.app/shops/readGiftShops")
      .then((res) => setShopList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getShops();
  }, []);
  return (
    <div>
      <Header />
      <h1>Gift Shops</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam porro
        dignissimos dolore dolor maiores. Aut optio rem ipsa nostrum, provident,
        obcaecati assumenda asperiores, eveniet dolore consectetur beatae! Illo,
        fuga nesciunt?
      </p>
      {shopList.map((shop, index) => (
        <DiningCard
          key={index}
          diningImage={diningImage}
          diningLocation={shop.location}
          diningName={shop.shopName}
          diningProducts={"products here"}
          diningOverview={"gifts and souvenirs"}
        />
      ))}
    </div>
  );
}
