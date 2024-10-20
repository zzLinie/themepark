import "./rideCard.css";

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
