import Header from "../components/header";
import RideCard from "../components/rideCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Rides() {
  const [rides, setRides] = useState([]);
  const [rideFilter, setRideFilter] = useState("all");

  const ridesList = () => {
    axios
      .get("http://localhost:3000/ride/read")
      .then((res) => {
        setRides(
          res.data.result.filter((ride) => {
            if (rideFilter == "all") {
              return ride;
            } else {
              return ride.rideType == rideFilter;
            }
          })
        );
      })
      .catch((err) => console.error(err));
    setRides(
      rides.filter((ride) => {
        if (rideFilter == "all") {
          return ride;
        }
        return ride.rideType == rideFilter;
      })
    );
  };
  useEffect(() => {
    ridesList();
    console.log("hi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rideFilter]);
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
        <select
          name="rides"
          id="rides"
          onChange={(e) => setRideFilter(e.target.value)}
        >
          <option value="all">All Rides</option>
          <option value="family">Family Rides</option>
          <option value="kid">Kids Rides</option>
        </select>
      </div>
      {rides.map((ride, index) => {
        return (
          <div key={index}>
            <RideCard rideName={ride.rideName} />;
          </div>
        );
      })}
    </>
  );
}
