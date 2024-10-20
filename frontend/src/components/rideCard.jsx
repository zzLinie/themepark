import "./rideCard.css";
import PropTypes from "prop-types";

export default function RideCard({
  rideImage,
  rideName,
  rideHeight,
  rideDescription,
}) {
  return (
    <div className="card-container">
      <img className="card-image" src={rideImage} alt="Ride Image" />
      <div className="content-container">
        <h1>{rideName}</h1>
        <p>{`Minimum Height: "${rideHeight}`}</p>
        <p>{rideDescription}</p>
      </div>
    </div>
  );
}

RideCard.propTypes = {
  rideImage: PropTypes.string,
  rideName: PropTypes.string,
  rideHeight: PropTypes.number,
  rideDescription: PropTypes.string,
};
