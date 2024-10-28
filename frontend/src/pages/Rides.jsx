import Header from "../components/header";
import RideCard from "../components/rideCard";
import rideImg from "../assets/images/placeholder-image.webp";
import "./events.css";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './DataEntryForm.css';

export default function Rides() {
  const [ridesList, setRidesList] = useState([]);
  const getRides = () => {
    axios
      .get("http://localhost:3000/rides/read")
      .then((res) => setRidesList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRides();
  }, []);
  return (
    <>
      <Header />
      <h1>Park Rides</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
        enim itaque perspiciatis voluptatibus numquam commodi corrupti
        voluptates, atque aspernatur dolore at accusantium inventore, quidem
        nemo error eos nulla rerum minima!
      </p>
      <div>
        <h2>Filter By</h2>
        <select name="rides" id="rides">
          <option value="all">All Rides</option>
          <option value="family">Family Rides</option>
          <option value="kids">Kids Rides</option>
        </select>
      </div>
      {ridesList.map((ride, index) => (
      <RideCard
        key = {index}
        rideImage={rideImg}
        rideName={ride.rideName}
        rideCapacity={ride.capacity}
        rideDescription={"this is the rides decription"}
      />
      ))}
    </>
  );
}
