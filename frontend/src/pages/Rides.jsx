import Header from "../components/header";
import RideCard from "../components/rideCard";
import rideImg from "../assets/images/placeholder-image.webp";

export default function Rides() {
  return (
    <>
      <Header />
      <h1>Water Park Rides</h1>
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
      <RideCard
        rideImage={rideImg}
        rideName={"Ride Name 1"}
        rideHeight={40}
        rideDescription={"this is the rides decription"}
      />
      <RideCard
        rideImage={rideImg}
        rideName={"Ride Name 2"}
        rideHeight={52}
        rideDescription={"this is the rides decription"}
      />
      <RideCard
        rideImage={rideImg}
        rideName={"Ride Name 3"}
        rideHeight={34}
        rideDescription={"this is the rides decription"}
      />
    </>
  );
}
