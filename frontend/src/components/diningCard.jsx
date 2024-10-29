import PropTypes from "prop-types";
import "./rideCard.css";

export default function DiningCard({
  diningImage,
  diningName,
  diningLocation,
  diningProducts,
  diningOverview,
}) {
  return (
    <div className="card-container">
      <div>
        <img src={diningImage} alt="" />
        
      </div>
      <div className="content-container">
        <h1>{diningName}</h1>
        <p>{`Location: ${diningLocation}`}</p>
        <p>{`Products: ${diningProducts}`}</p>
        <p>{diningOverview}</p>
      </div>
    </div>
  );
}
DiningCard.propTypes = {
  diningImage: PropTypes.string,
  diningName: PropTypes.string,
  diningLocation: PropTypes.string,
  diningProducts: PropTypes.string,
  diningOverview: PropTypes.string,
};
